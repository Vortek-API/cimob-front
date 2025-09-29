import type { Indicador } from '~/types/indicador'

export async function fetchIndicadores(regiaoId?: number, dataInicial?: string): Promise<Indicador[]> {
  const config = useRuntimeConfig();
  let url = `${config.public.API_URL}/indicadores`;
  
  const params = new URLSearchParams();
  
  if (regiaoId) {
    params.append('regiaoId', regiaoId.toString());
  }
  
  if (dataInicial) {
    params.append('dataInicial', dataInicial);
  }
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar indicadores');
  return await response.json();
}
