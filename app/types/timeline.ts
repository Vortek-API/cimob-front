export interface Timeline {
  timelineId: number;
  tipo: TimelineTipo;
  emailUsuario: string;
  acao: TimelineAcao;
  descricao: string;
  data: string;
}

export enum TimelineTipo {
  USUARIO = 'USUARIO',
  INDICADOR = 'INDICADOR',
  EVENTO = 'EVENTO',
  INDEFINIDO = 'INDEFINIDO',
}

export enum TimelineAcao {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ALTERACAO = 'ALTERACAO',
  CRIACAO = 'CRIACAO',
  EXCLUSAO = 'EXCLUSAO',
  INDEFINIDO = 'INDEFINIDO',
}