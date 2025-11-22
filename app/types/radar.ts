export interface Radar {
  radarId: string;
  regiaoId: number;
  latitude: number;
  longitude: number;
  endereco: string;
  velocidadePermitida: number;
}

export interface IndicadorRadar {
  indicadorId: number;
  nome: string;
  valor: number;
  mnemonico: string;
  oculto: boolean;
  descricao: string;
  usuarioId: number;
  radarId: string;
}
