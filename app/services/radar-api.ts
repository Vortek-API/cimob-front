import { getApi } from "~/config/axios-config";
import type { IndicadorRadar, Radar } from '~/types/radar';
import { getCurrentWindowTimestampString } from '~/store/timestamp';

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

export async function fetchIndicadoresPorRadar(radarId: string, timestamp: string = getCurrentWindowTimestampString()): Promise<IndicadorRadar[]> {

  const params = new URLSearchParams();
  let url = `/radares/${radarId}/indicadores`;
  
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

export async function fetchIndicadoresComRadar(timestamp: string = getCurrentWindowTimestampString()): Promise<IndicadorRadar[]> {

  const params = new URLSearchParams();
  let url = `/radares/indicadores`;
  
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

