<template>
  <aside class="w-72 h-screen overflow-y-auto bg-blue-100 border-r border-blue-200 flex flex-col select-none relative text-black">
    <!-- Logo -->
    <div class="px-6 pt-4 pb-3 flex items-center">
      <img src="/images/cimob.png" alt="CIMOB" class="h-16 object-contain" />
    </div>

    <div class="-ml-6 mr-10 border-t-4 border-blue-900" />

    <!-- Navegação -->
    <nav class="flex-1 p-3 space-y-1 mt-4">
      <template v-for="item in items" :key="item.label">
        <RouterLink
          v-if="item.to"
          :to="item.to"
          class="block px-6 py-2 rounded text-black hover:bg-blue-200 transition-colors font-semibold"
          :class="activeMap[item.label] ? 'bg-blue-200 border-l-4 border-blue-600 pl-3 font-medium' : ''"
        >
          {{ item.label }}
        </RouterLink>
        <button
          v-else
          type="button"
          class="w-full text-left block px-6 py-2 rounded text-black hover:bg-blue-200 transition-colors font-semibold"
        >
          {{ item.label }}
        </button>
      </template>
    </nav>

    <!-- Rodapé -->
    <div class="mt-auto p-4 text-sm text-black space-y-3 mb-8 ml-6">
      <div>
        <div class="opacity-70">Última atualização:</div>
        <div class="font-medium">{{ formattedUpdatedAt }}</div>
      </div>

      <!-- Info do usuário -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-white border border-blue-300 flex items-center justify-center text-black">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"/>
          </svg>
        </div>
        <div>
          <div class="font-medium leading-tight">{{ email }}</div>
          <button type="button" class="text-blue-700 hover:underline text-sm" @click="logout">
            Sair
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/store/authStore'
import { ultimaAtualizacao } from '~/store/filtro'
import {jwtDecode} from 'jwt-decode'

type Item = { label: string; to?: string }

// Props com default items
const props = withDefaults(defineProps<{ items?: Item[] }>(), {
  items: () => [
    { label: 'Home', to: '/home' },
    { label: 'Mapas', to: '/map' },
    // { label: 'Base de dados', to: '/database' },
  ],
})

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

// --- Items garantidos como array SSR-safe
const items = computed(() => props.items ?? [])

// --- Username (client-side only)
const email = ref('Usuário')
onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const decoded = jwtDecode<{ sub?: string; email?: string; nome?: string }>(token)
      email.value = decoded.email || decoded.sub || decoded.nome || 'Usuário'
    } catch (err) {
      console.error('Erro ao decodificar token:', err)
      email.value = 'Usuário'
    }
  }
})

// --- Logout
function logout() {
  auth.logout()
  router.push('/login')
}

// --- Active map SSR-safe
const routePath = computed(() => (typeof window !== 'undefined' ? route.path : ''))
const activeMap = computed(() => {
  const map: Record<string, boolean> = {}
  items.value.forEach(item => {
    map[item.label] = !!item.to && routePath.value.startsWith(item.to)
  })
  return map
})

// --- Formatted last update
const formattedUpdatedAt = computed(() => {
  if (!ultimaAtualizacao.value) return 'Nunca atualizado'
  const d = new Date(ultimaAtualizacao.value)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} - ${pad(d.getHours())}:${pad(d.getMinutes())}`
})
</script>

<style scoped>
aside {
  font-family: 'Nunito', sans-serif;
}
</style>
