import type { Radar } from '~/types/radar';

export async function fetchRadars(): Promise<Radar[]> {
  const response = await fetch('/radars');
  if (!response.ok) throw new Error('Erro ao buscar radares');
  return await response.json();
}
