import type { Indicador } from "./indicador";
import type { Usuario } from "./usuario";

export interface Evento {
  eventoId: number;
  nome: string;
  data: Date;
  descricao: string;
  usuario: Usuario;
  indicadores: Indicador[];
}

export interface EventoRequest {
  eventoId: number;
  nome: string;
  data: Date;
  descricao: string;
  usuario: number;
  indicadores: number[];
}