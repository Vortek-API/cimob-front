import { getApi } from "~/config/axios-config";
import type { Regiao } from '~/types/regiao';

const REGIAO_CACHE_MS = 30 * 60 * 1000
let cachedRegioes: Regiao[] | null = null
let cachedAt: number | null = null

export async function fetchRegioes(): Promise<Regiao[]> {
  const now = Date.now()
  if (cachedRegioes && cachedAt && now - cachedAt < REGIAO_CACHE_MS) return cachedRegioes
  const api = getApi();
  const response = await api.get(`/regioes`);
  cachedRegioes = response.data;
  cachedAt = now
  return cachedRegioes;
}
