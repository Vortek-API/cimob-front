import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type Usuario, CargoUsuario } from '~/types/usuario'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const usuario = ref<Usuario | null>(null) // ADICIONADO: Estado para o objeto Usuario

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => usuario.value?.cargo === CargoUsuario.ADMIN) // ADICIONADO: Computed para verificar se é ADMIN

  const setToken = (value: string) => {
    token.value = value
    if (typeof window !== 'undefined') localStorage.setItem('token', value)
  }

  const setUsuario = (value: Usuario) => {
    usuario.value = value
  }

  const setRefreshToken = (value: string) => {
    refreshToken.value = value
    if (typeof window !== 'undefined') localStorage.setItem('refreshToken', value)
  }

  const logout = () => {
    token.value = null
    refreshToken.value = null
    usuario.value = null // ADICIONADO: Limpar o usuário no logout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    }
  }

  return { token, refreshToken, usuario, setToken, setRefreshToken, setUsuario, logout, isAuthenticated, isAdmin }
})
