import { getApi } from "~/config/axios-config";
import type { Ponto } from '~/types/ponto'

export async function fetchPontos(): Promise<Ponto[]> {
  const api = getApi();
  const response = await api.get(`/pontos`);
  return response.data;
  }
