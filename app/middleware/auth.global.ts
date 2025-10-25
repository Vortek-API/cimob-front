// ~/middleware/auth.global.ts
import { navigateTo } from '#app'
import { useAuthStore } from '~/store/authStore'

export default defineNuxtRouteMiddleware((to) => {
  // só roda no navegador
  if (typeof window !== 'undefined') {
    // Permitir pular validação em desenvolvimento
    const config = useRuntimeConfig()
    const bypass = (process.env.NODE_ENV === 'development') && !!config.public.AUTH_BYPASS
    if (bypass) {
      // Ativa um token fake para que componentes/pages que checam isAuthenticated não redirecionem
      try {
        const auth = useAuthStore()
        if (!auth.token) {
          auth.setToken('__DEV_BYPASS__')
          if (!auth.refreshToken) auth.setRefreshToken?.('__DEV_BYPASS__')
        }
      } catch {}
      // Não faz nenhum redirecionamento quando bypass está ativo
      return
    }

    const auth = useAuthStore()

    // inicializa os tokens do localStorage
    auth.token = localStorage.getItem('token')
    auth.refreshToken = localStorage.getItem('refreshToken')

    // se precisa de login e não está autenticado
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
      if (to.path !== '/login') {
        return navigateTo('/login')
      }
    }

    // se está logado e tenta acessar login
    if (to.path === '/login' && auth.isAuthenticated) {
      return navigateTo('/home')
    }
  }
})
