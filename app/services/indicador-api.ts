import type { Indicador } from '~/types/indicador'

export async function fetchIndicadores(regiaoId?: number, timestamp?: string): Promise<Indicador[]> {
  const config = useRuntimeConfig();
  let url = `${config.public.API_URL}/indicadores`;
  
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
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar indicadores');
  return await response.json();
}

export async function fetchIndicesCriticos(regiaoId?: number, timestamp?: string): Promise<any[]> {
  const config = useRuntimeConfig();
  let url = `${config.public.API_URL}/indicadores/indices-criticos`;
  
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
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar índices críticos');
  return await response.json();
}
