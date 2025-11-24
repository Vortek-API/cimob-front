import axios from "axios";
import type { AxiosInstance } from "axios";

const instances: Record<string, AxiosInstance> = {};

export function getApi(basePath = ""): AxiosInstance {
  if (instances[basePath]) return instances[basePath];

  const config = useRuntimeConfig();
  const instance = axios.create({
    baseURL: `${config.public.API_URL}${basePath}`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });

  instance.interceptors.request.use(async (cfg) => {
    try {
        const mod = await import("~/store/authStore");
        const useAuthStore = (mod as any).useAuthStore ?? (mod as any).default ?? (mod as any);
        if (typeof useAuthStore === "function") {
            const auth = useAuthStore();
            const token = auth?.token;
            if (token && cfg.headers) (cfg.headers as any).Authorization = `Bearer ${token}`;
                console.log("Added Authorization header to request:", cfg);
        }
    } catch (e) {
    }
    return cfg;
  });

  instances[basePath] = instance;
  return instance;
}

export default getApi;