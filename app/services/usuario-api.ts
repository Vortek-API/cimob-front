import { getApi } from "~/config/axios-config";
import type { Usuario } from "~/types/usuario";

export async function getCargo(email: string): Promise<string> {
  // O endpoint é /cargo/{email} e faz parte da API principal (sem prefixo /auth)
  const api = getApi(); 
  
  const { data } = await api.get(`usuario/cargo/${email}`);
  
  return data;
}

export async function getUsuarios(): Promise<Usuario[]>{
  const api = getApi();
  const response = await api.get(`/usuario`);
  
  return response.data;
}

export async function createUsuario(usuario: Usuario): Promise<Usuario>{
  const api = getApi();
  const response = await api.post(`/usuario`, usuario);
  
  return response.data;
}

export async function updateUsuario(usuario: Usuario): Promise<Usuario>{
  const api = getApi();
  const response = await api.put(`/usuario/${usuario.usuarioId}`, usuario);

  return response.data;
}

export async function deleteUsuario(usuarioId: number): Promise<void>{
  const api = getApi();
  await api.delete(`/usuario/${usuarioId}`);
}

export async function getUsuarioByEmail(email: string): Promise<Usuario>{
  const api = getApi();
  const response = await api.get(`/usuario/email/${email}`);

  return response.data;
}

