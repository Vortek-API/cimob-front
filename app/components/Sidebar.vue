<template>
  <UDashboardSidebar
    collapsible
    resizable
    class="modern-sidebar bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white
      [--ui-text-default:white] [--ui-text-muted:#cbd5e1]
      [--ui-color-neutral-500:white] [--ui-color-neutral-600:#e2e8f0] [--ui-color-neutral-700:#f1f5f9]
      border-r border-slate-700"
    :ui="{ footer: 'border-t border-slate-700' }"
  >
  <template #default="{ collapsed }">
    <!-- Logo Section -->
    <div class="px-3 pt-4 pb-6 flex items-center justify-center border-b border-slate-700">
      <div v-if="!collapsed" class="flex flex-col items-center gap-2">
        <img src="/images/cimob.png" alt="CIMOB" class="h-16 object-contain" />
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-widest">Monitoramento</p>
      </div>
      <div v-else class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
        <span class="text-white font-bold text-sm">C</span>
      </div>
    </div>

    <!-- Navigation Menu -->
    <UNavigationMenu
      :collapsed="collapsed"
      :items="visibleItems"
      orientation="vertical"
      class="px-2 py-4"
    />

    <!-- Telegram Button for Admin (Desktop) -->
    <div v-if="auth.isAdmin && !collapsed" class="px-2 py-4 border-t border-slate-700 mt-auto">
      <a
        href="https://t.me/+rGmkfxYTzmYwYTMx"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center gap-2 w-full px-3 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a11.955 11.955 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.365-1.337.175-.437-.148-1.33-.414-1.98-.742-.798-.329-1.424-.608-1.369-1.056.025-.168.325-.337.893-.501 3.5-1.33 5.228-2.223 6.3-3.843.652-1.01 1.077-2.35.923-3.595-.140-1.174-1.555-2.752-3.144-2.678z"/>
        </svg>
        <span>Telegram</span>
      </a>
    </div>

    <!-- Last Update Info -->
    <div v-if="!collapsed" class="px-2 pt-4 mt-auto border-t border-slate-700">
      <p class="text-xs text-slate-400">Última atualização:</p>
      <p class="text-xs font-semibold text-slate-300 mt-1">{{ formattedUpdatedAt }}</p>
    </div>
  </template>

  <!-- Footer with User Info -->
  <template #footer="{ collapsed }">
    <div class="w-full px-2 py-3 border-t border-slate-700">
      <div class="flex items-center gap-3" :class="collapsed ? 'justify-center' : ''">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
          <span class="text-white font-bold text-sm">{{ email.charAt(0).toUpperCase() }}</span>
        </div>
        <div v-if="!collapsed" class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-white truncate">{{ email }}</p>
          <p class="text-xs text-slate-400 mt-0.5">Usuário {{ auth.isAdmin ? 'Administrador' : 'Padrão' }}</p>
        </div>
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-log-out"
          :aria-label="collapsed ? 'Sair' : ''"
          size="sm"
          class="flex-shrink-0"
          @click="logout"
        />
      </div>
    </div>
  </template>
  </UDashboardSidebar>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '~/store/authStore'
import { ultimaAtualizacao } from '~/store/filtro'
import { jwtDecode } from 'jwt-decode'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const email = ref('Usuário')

// 🔐 Decodifica o token e pega o email
onMounted(() => {
  const token = auth.token
  if (token) {
    try {
      const decoded = jwtDecode<{ sub?: string; email?: string; nome?: string }>(token)
      const userEmail = decoded.email || decoded.sub || decoded.nome || 'Usuário'
      email.value = userEmail
    } catch (err) {
      console.error('Erro ao decodificar token:', err)
      email.value = 'Usuário'
    }
  }
})

// 🚪 Logout
function logout() {
  auth.logout()
  router.push('/login')
}

// 🧭 Menu de navegação
const items = computed<NavigationMenuItem[]>(() => {
  const baseItems: NavigationMenuItem[] = [
    {
      label: 'Home',
      icon: 'i-lucide-house',
      to: '/home',
    },
    {
      label: 'Mapas',
      icon: 'i-lucide-map-pin-check-inside',
      to: '/map',
    },
    {
      label: 'Dashboard',
      icon: 'i-lucide-chart-no-axes-combined',
      defaultOpen: true,
      children: [
        { label: 'Velocidades Registradas', to: '/dashboard/velocidade' },
        { label: 'Tipos de Veículos', to: '/dashboard/veiculos' },
      ],
    }
  ]

  if (auth.isAdmin) {
    baseItems.push({
      label: 'Administrador',
      icon: 'i-lucide-shield',
      defaultOpen: false,
      children: [
        { label: 'Logs', to: '/admin/logs' },
        { label: 'Acessos', to: '/admin/acessos' },
        { label: 'Eventos', to: '/eventos'},
      ],
    })
  }

  return baseItems
})

// Filter visible items (handles boolean, computed refs or functions)
const visibleItems = computed(() => {
  return items.value.filter((i) => {
    const s: any = (i as any).show
    if (s === undefined) return true
    if (typeof s === 'boolean') return s
    if (s && typeof s === 'object' && 'value' in s) return Boolean(s.value)
    if (typeof s === 'function') return Boolean(s())
    return Boolean(s)
  })
})

// 🕒 Última atualização formatada
const formattedUpdatedAt = computed(() => {
  if (!ultimaAtualizacao?.value) return 'Nunca atualizado'
  const d = new Date(ultimaAtualizacao.value)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`
})
</script>

<style scoped>
.modern-sidebar :deep(.iconify) {
  color: currentColor !important;
}

.modern-sidebar :deep(nav a) {
  color: white !important;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-sidebar :deep(nav a:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: #60a5fa !important;
}

.modern-sidebar :deep(nav a.active) {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%) !important;
  color: #60a5fa !important;
  border-left: 3px solid #3b82f6 !important;
  padding-left: calc(1rem - 3px) !important;
}
</style>
