// ~/middleware/auth.global.ts
import { navigateTo } from '#app'
import { useAuthStore } from '~/store/authStore'

export default defineNuxtRouteMiddleware((to) => {
  // só roda no navegador
  if (typeof window !== 'undefined') {
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
