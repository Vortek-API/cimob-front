<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { sub } from 'date-fns'
import type { DropdownMenuItem } from '@nuxt/ui'
import { useDashboard } from '../../composables/useDashboard'
import type { Period, Range } from '../../types/'

const { isNotificationsSlideoverOpen } = useDashboard()

const items = [[{
  label: 'New mail',
  icon: 'i-lucide-send',
  to: '/inbox'
}, {
  label: 'New customer',
  icon: 'i-lucide-user-plus',
  to: '/customers'
}]] satisfies DropdownMenuItem[][]

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})
const period = ref<Period>('daily')

definePageMeta({
  requiresAuth: true,
  alias: ['/dashboard/velocidade']
})
</script>

<template>
  <UDashboardGroup class="min-h-screen">
    <Sidebar />
    <UDashboardPage class="dashboard-full dashboard-scroll w-full min-w-0 !max-w-none !px-0">
      <UDashboardPanel id="velocidade" class="w-full">
        <template #body>
          <div class="px-2 py-3">
            <h1 class="text-4xl font-semibold text-[#1b3b82]">Velocidades Registradas</h1>
          </div>
          <div>
            <UDashboardToolbar>
              <template #left>
                <VelocidadeDateRangePicker v-model="range" />
                <FiltersRegionSelect />
                <FiltersRadarSelect />
              </template>
              <template #right>
                <div class="flex items-center border-l border-default pl-3 ml-2">
                  <VelocidadePeriodSelect v-model="period" :range="range" />
                </div>
              </template>
            </UDashboardToolbar>
          </div>

          <VelocidadeStats :period="period" :range="range" />
          <VelocidadeChart :period="period" :range="range" />
          <VelocidadeSales :period="period" :range="range" />
        </template>
      </UDashboardPanel>
    </UDashboardPage>
  </UDashboardGroup>
</template>

<style scoped>
/* Remove limite de largura interno do UDashboardPage (usa container) */
.dashboard-full :deep(.container) {
  max-width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* Faz o painel principal rolar apenas na vertical (sidebar fica fixa) */
.dashboard-scroll {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
