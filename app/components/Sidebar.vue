<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '~/store/authStore'
import { ultimaAtualizacao } from '~/store/filtro'
import { jwtDecode } from 'jwt-decode'
// import { getCargo } from '~/services/usuario-api' <-- REMOVIDO

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const email = ref('Usuário')
// const isAdmin = ref(false) <-- REMOVIDO

// 🔐 Decodifica o token e pega o email
onMounted(() => {
  const token = auth.token // ALTERAÇÃO: Usa o token do store
  if (token) {
    try {
      const decoded = jwtDecode<{ sub?: string; email?: string; nome?: string }>(token)
      const userEmail = decoded.email || decoded.sub || decoded.nome || 'Usuário'
      email.value = userEmail
      // if (userEmail !== 'Usuário') {
      //   fetchUserRole(userEmail) <-- REMOVIDO
      // }
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

// 🧭 Menu de navegação (sem array duplo, tipagem corrigida)
const items: NavigationMenuItem[] = [
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
      { label: 'Tipos de Veículos', to: '/dashboard/tipos-veiculos' },
    ],
  }
]

if(auth.isAdmin) {
items.push({
    label: 'Administrador',
    icon: 'i-lucide-shield',
    defaultOpen: false,
    children: [
      { label: 'Logs', to: '/admin/logs' },
      { label: 'Acessos', to: '/admin/acessos' },
    ],
    show: computed(() => auth.isAdmin),
  },)
}

// 🕒 Última atualização formatada
const formattedUpdatedAt = computed(() => {
  if (!ultimaAtualizacao?.value) return 'Nunca atualizado'
  const d = new Date(ultimaAtualizacao.value)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} - ${pad(d.getHours())}:${pad(d.getMinutes())}`
})
</script>

<template>
  <UDashboardSidebar
    collapsible
    resizable
    class="cimo-sidebar bg-[#cde8ff] text-[#1b3b82]
      [--ui-text-default:#1b3b82] [--ui-text-muted:#3c5aa8]
      [--ui-color-neutral-500:#1b3b82] [--ui-color-neutral-600:#234ea5] [--ui-color-neutral-700:#1e3f95]
      border-r border-[#bcd9ff]"
    :ui="{ footer: 'border-t border-[#bcd9ff]' }"
  >
  <template #default="{ collapsed }">
    <div class="px-3 pt-1 pb-3 flex items-center">
      <img src="/images/cimob.png" alt="CIMOB" class="h-24 object-contain" />
    </div>

      <UNavigationMenu
        :collapsed="collapsed"
        :items="items.filter((i: { show: undefined }) => i.show === undefined || i.show)"
        orientation="vertical"
      />

      <div v-if="!collapsed" class="px-2 pt-2 mt-auto">
        <p class="text-xs text-muted">Última atualização: {{ formattedUpdatedAt }}</p>
      </div>
    </template>

    <template #footer="{ collapsed }">
      <div class="w-full px-2 py-2">
        <div class="flex items-center gap-3" :class="collapsed ? 'justify-center' : ''">
          <UAvatar :alt="email.charAt(0).toUpperCase()" size="md" class="rounded-md" />
          <div v-if="!collapsed" class="min-w-0 flex-1">
            <p class="text-sm font-medium truncate">{{ email }}</p>
            <UButton
              size="xs"
              color="neutral"
              variant="ghost"
              icon="i-lucide-log-out"
              class="mt-1 px-1"
              @click="logout"
            >
              Sair
            </UButton>
          </div>
          <UButton
            v-else
            color="neutral"
            variant="ghost"
            icon="i-lucide-log-out"
            aria-label="Sair"
            @click="logout"
          />
        </div>
      </div>
    </template>
  </UDashboardSidebar>
</template>

<style scoped>
.cimo-sidebar :deep(.iconify) {
  color: currentColor !important;
}

.cimo-sidebar :deep(nav a) {
  color: #1b3b82 !important;
}

.cimo-sidebar :deep(nav a:hover),
.cimo-sidebar :deep(nav a[aria-current='page']) {
  color: #ffffff !important;
  background-color: #1e3f95 !important;
}

.cimo-sidebar :deep(nav a:hover .iconify),
.cimo-sidebar :deep(nav a[aria-current='page'] .iconify) {
  color: #ffffff !important;
}
</style>
