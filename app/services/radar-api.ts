import { getApi } from "~/config/axios-config";
import type { Radar } from '~/types/radar';

export async function fetchRadars(): Promise<Radar[]> {
  const api = getApi();
  const response = await api.get(`/radares`);
  return response.data;
}
