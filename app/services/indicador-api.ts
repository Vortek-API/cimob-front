import type { Indicador } from '~/types/indicador';

export async function fetchindicadores(): Promise<Indicador[]> {
  const response = await fetch(`${process.env.API_URL}/indicadores`);
  if (!response.ok) throw new Error('Erro ao buscar indicadores');
  return await response.json();
}