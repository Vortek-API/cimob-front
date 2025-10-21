import axios from "axios";
import { useAuthStore } from "~/store/authStore";

// Interfaces de request e response
export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

// Cria instância do Axios
const api = axios.create({
  baseURL: "http://localhost:8080/api/auth",
  headers: { "Content-Type": "application/json" },
});

// Interceptor: adiciona token se existir
api.interceptors.request.use(config => {
  try {
    const auth = useAuthStore();
    const token = auth.token; // token é string, não ref
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    console.warn("Não foi possível adicionar token no header", e);
  }
  return config;
});

// Função de login
export async function autenticarUsuario(credentials: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/login", credentials);
  return data;
}

// Função de refresh token
export async function refreshToken(token: string): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>(`/refresh?refreshToken=${token}`);
  return data;
}

// Função de logout
export async function logout(email: string): Promise<void> {
  await api.post(`/logout?email=${email}`);
}

export default api;
