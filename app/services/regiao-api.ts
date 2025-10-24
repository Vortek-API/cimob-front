import { getApi } from "~/config/axios-config";
import type { Regiao } from '~/types/regiao';

export async function fetchRegioes(): Promise<Regiao[]> {
  const api = getApi();
  const response = await api.get(`/regioes`);
  return response.data;
}
