import type { Evento } from "./evento";
import type { Usuario } from "./usuario";

export interface Indicador {
  indicadorId: number;
  nome: string;
  valor: number;
  descricao: string;
  usuario: Usuario;
  eventos: Evento[];
}

export interface IndicadorRequest {
  indicadorId: number;
  nome: string;
  valor: number;
  descricao: string;
  usuario: number;
  eventos: number[];
}