import type { Indicador } from '~/types/indicador'
import { getApi } from "~/config/axios-config";
import { reloadIndicadores } from '~/store/indicadores';
import { regiaoSelecionada } from '~/store/filtro';
import { getCurrentWindowTimestampString } from '~/store/timestamp';

export async function fetchIndicadores(regiaoId?: number, timestamp?: string): Promise<Indicador[]> {
  let url = `/indicadores`;
  
  const params = new URLSearchParams();
  
  if (regiaoId) {
    params.append('regiaoId', regiaoId.toString());
  }
  
  if (timestamp) {
    params.append('timestamp', timestamp);
  }
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  const api = getApi();
  const response = await api.get(url);
  return response.data;
}

export async function fetchIndicesCriticos(regiaoId?: number, timestamp?: string): Promise<Indicador[]> {
  let url = `/indicadores/indices-criticos`;
  
  const params = new URLSearchParams();
  
  if (regiaoId) {
    params.append('regiaoId', regiaoId.toString());
  }
  
  if (timestamp) {
    params.append('timestamp', timestamp);
  }
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  const api = getApi();
  const response = await api.get(url);
  return response.data;
}

export async function fetchIndicadoresSemCalculo(): Promise<Indicador[]> {
  let url = `/indicadores/sem-calculo`;

  const api = getApi();
  const response = await api.get(url);
  return response.data;
}

export async function fetchAtualizaSelecionados(indicadoresId: number[]): Promise<void> {
  const api = getApi();

  try {
    await api.patch(`/indicadores/atualiza-selecionados`, indicadoresId);
  } catch (error) {
    console.error("Erro ao atualizar indicadores:", error);
  } finally {
    setTimeout(() => {
      const timestampAtual = getCurrentWindowTimestampString()
      reloadIndicadores(regiaoSelecionada.value!, timestampAtual)
    }, 500);
  }
}

