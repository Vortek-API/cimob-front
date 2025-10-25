export interface Usuario {
  usuarioId: number;
  nome: string;
  cargo: CargoUsuario;
  cpf: string;
  email: string;
}

export enum CargoUsuario {
  ADMIN = 'ADMIN',
  USUARIO = 'USUARIO',
  INDEFINIDO = 'INDEFINIDO',
}