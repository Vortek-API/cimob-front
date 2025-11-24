import { getApi } from "~/config/axios-config";
import type { Radar } from '~/types/radar';

const RADAR_CACHE_MS = 30 * 60 * 1000
let cachedRadars: Radar[] | null = null
let cachedAt: number | null = null

export async function fetchRadars(): Promise<Radar[]> {
  const now = Date.now()
  if (cachedRadars && cachedAt && now - cachedAt < RADAR_CACHE_MS) return cachedRadars
  const api = getApi();
  const response = await api.get(`/radares`);
  cachedRadars = response.data
  cachedAt = now
  return cachedRadars;
}
