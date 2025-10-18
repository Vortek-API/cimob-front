import axios from "axios";
import { useAuthStore } from "~/store/authStore";

// Interface de requisição de login
export interface LoginRequest {
  userName: string;
  senha: string;
}

// Interface de resposta do login
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

// Cria instância do Axios
const api = axios.create({
  baseURL: "http://localhost:8080/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: adiciona token no header se estiver logado
api.interceptors.request.use((config) => {
  try {
    const auth = useAuthStore();      // pega a store no momento da requisição
    const token = auth.token?.valueOf;  // .value porque é um ref
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.warn("Não foi possível adicionar token no header", e);
  }
  return config;
});

// Função para autenticar usuário
export async function autenticarUsuario(
  credentials: LoginRequest
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/login", credentials);
  return data;
}

// Função para refresh token
export async function refreshToken(
  token: string
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>(
    `/refresh?refreshToken=${token}`
  );
  return data;
}

// Função para logout
export async function logout(userName: string): Promise<void> {
  await api.post(`/logout?userName=${userName}`);
}

export default api;
