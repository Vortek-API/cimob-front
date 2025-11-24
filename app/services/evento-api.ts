import { getApi } from "~/config/axios-config";
import type { Evento, EventoRequest } from '~/types/evento';

export async function criarEvento(evento: EventoRequest): Promise<Evento> {
  const api = getApi();
  const response = await api.post(`/eventos`, evento);
  return response.data;
}

export async function listarEventos(): Promise<Evento[]> {
  const api = getApi();
  const response = await api.get(`/eventos`);
  return response.data;
}

export async function deletarEvento(eventoId: number): Promise<void> {
  const api = getApi();
  await api.delete(`/eventos/${eventoId}`);
}

export async function atualizarEvento(eventoId: number, evento: EventoRequest): Promise<Evento> {
  const api = getApi();
  const response = await api.put(`/eventos/${eventoId}`, evento);
  return response.data;
}

export const criarEventoExterno = criarEvento;
export const listarEventosExternos = listarEventos;
export const atualizarEventoExterno = atualizarEvento;
