import { getApi } from "~/config/axios-config";

// Interfaces de request e response
export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

// Função de login
export async function autenticarUsuario(credentials: LoginRequest): Promise<LoginResponse> {
  const api = getApi('/auth');
  const { data } = await api.post<LoginResponse>("/login", credentials);
  return data;
}

// Função de refresh token
export async function refreshToken(token: string): Promise<LoginResponse> {
  const api = getApi('/auth');
  const { data } = await api.post<LoginResponse>(`/refresh?refreshToken=${token}`);
  return data;
}

// Função de logout
export async function logout(email: string): Promise<void> {
  const api = getApi('/auth');
  await api.post(`/logout?email=${email}`);
}

export default getApi;