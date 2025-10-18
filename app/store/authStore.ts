import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem("token"));
  const refreshToken = ref<string | null>(localStorage.getItem("refreshToken"));

  const setToken = (value: string) => {
    token.value = value;
    localStorage.setItem("token", value);
  };

  const setRefreshToken = (value: string) => {
    refreshToken.value = value;
    localStorage.setItem("refreshToken", value);
  };

  const logout = () => {
    token.value = null;
    refreshToken.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  const isAuthenticated = computed(() => !!token.value);

  return { token, refreshToken, setToken, setRefreshToken, logout, isAuthenticated };
});
