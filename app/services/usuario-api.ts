import { getApi } from "~/config/axios-config";
import type { Usuario } from "~/types/usuario";

export async function getCargo(email: string): Promise<string> {
  // O endpoint é /cargo/{email} e faz parte da API principal (sem prefixo /auth)
  const api = getApi(); 
  
  console.log("Buscando cargo para o email:", email);
  
  const { data } = await api.get(`usuario/cargo/${email}`);
  
  return data;
}

export async function getUsuarios(): Promise<Usuario[]>{
  const api = getApi();
  const response = await api.get(`/usuario`);
  
  return response.data;
}

