import type { Indicador } from "./indicador";

export interface Radar {
  radarId: string;
  regiaoId: number;
  latitude: number;
  longitude: number;
  endereco: string;
  velocidadePermitida: number;
}

export interface IndicadorRadar {
  indicador: Indicador
  radarId: string;
}
