import type { Ponto } from '~/types/ponto'

export async function fetchPontos(): Promise<Ponto[]> {
  const config = useRuntimeConfig();
  const response = await fetch(`${config.public.API_URL}/pontos`);
  if (!response.ok) throw new Error('Erro ao buscar pontos');
  return await response.json();
  }
