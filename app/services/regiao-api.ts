import type { Regiao } from '~/types/regiao'

export async function fetchRegioes(): Promise<Regiao[]> {
  const config = useRuntimeConfig();
  const response = await fetch(`${config.public.API_URL}/regioes`);
  if (!response.ok) throw new Error('Erro ao buscar regiões');
  return await response.json();
}
