<script setup lang="ts">
import { navigateTo } from '#app'
import { useAuthStore } from '~/store/authStore'

if (typeof window !== 'undefined') {
  const auth = useAuthStore()
  auth.token = localStorage.getItem('token')
  auth.refreshToken = localStorage.getItem('refreshToken')

  navigateTo(auth.isAuthenticated ? '/home' : '/login')
}
</script>
