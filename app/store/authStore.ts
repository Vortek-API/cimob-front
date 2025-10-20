import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (value: string) => {
    token.value = value
    if (typeof window !== 'undefined') localStorage.setItem('token', value)
  }

  const setRefreshToken = (value: string) => {
    refreshToken.value = value
    if (typeof window !== 'undefined') localStorage.setItem('refreshToken', value)
  }

  const logout = () => {
    token.value = null
    refreshToken.value = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    }
  }

  return { token, refreshToken, setToken, setRefreshToken, logout, isAuthenticated }
})
