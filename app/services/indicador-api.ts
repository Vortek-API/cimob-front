import type { Indicador } from '~/types/indicador'
import { getApi } from "~/config/axios-config";

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

export async function fetchIndicesCriticos(regiaoId?: number, timestamp?: string): Promise<any[]> {
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
