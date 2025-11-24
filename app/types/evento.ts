import type { RegiaoResponse } from "./regiao";

export interface Evento {
  eventoId: number;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  regioes: RegiaoResponse[];
}

export interface EventoRequest {
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  regioesIds: number[];
}