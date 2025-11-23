import { getApi } from "~/config/axios-config";
import type { Evento } from '~/types/evento';

export interface EventoExterno extends Evento {
  tipo?: string;
  regioesIds?: number[];
}

export async function criarEventoExterno(evento: EventoExterno): Promise<Evento> {
  const api = getApi();
  const response = await api.post(`/eventos/externo`, {
    nome: evento.nome,
    descricao: evento.descricao,
    tipo: 'E',
    regioesIds: evento.regioesIds || []
  });
  return response.data;
}

export async function listarEventos(): Promise<Evento[]> {
  const api = getApi();
  const response = await api.get(`/eventos`);
  return response.data;
}

export async function listarEventosExternos(): Promise<EventoExterno[]> {
  const api = getApi();
  const response = await api.get(`/eventos`);
  return response.data.filter((e: EventoExterno) => e.tipo === 'E');
}

export async function deletarEvento(eventoId: number): Promise<void> {
  const api = getApi();
  await api.delete(`/eventos/${eventoId}`);
}
