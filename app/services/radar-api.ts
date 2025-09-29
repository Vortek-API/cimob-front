import type { Radar } from '~/types/radar'

export async function fetchRadars(): Promise<Radar[]> {
  const config = useRuntimeConfig();
  const response = await fetch(`${config.public.API_URL}/radares`);
  if (!response.ok) throw new Error('Erro ao buscar radares');
  return await response.json();
}
