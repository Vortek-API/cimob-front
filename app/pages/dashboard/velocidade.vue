<script setup lang="ts">
import { ref, shallowRef, computed, watch, onMounted } from 'vue'
import { sub } from 'date-fns'
import { useDashboard } from '../../composables/useDashboard'
import type { Period, Range } from '../../types/'
import { regiaoSelecionada, setRegiaoSelecionada } from '~/store/filtro'
import { useRegistrosVelocidade } from '~/composables/useRegistrosVelocidade'

const { isNotificationsSlideoverOpen, selectedRadar } = useDashboard()
const { registros, fetchRegistros, loading } = useRegistrosVelocidade()
const toast = useToast()

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})
const period: Period = 'daily'

definePageMeta({
  requiresAuth: true,
  alias: ['/dashboard/velocidade']
})

async function pesquisar() {
  console.log('[dashboard/velocidade] pesquisar filtros', {
    radar: selectedRadar.value,
    regiao: regiaoSelecionada.value
  })
  await fetchRegistros(range.value, selectedRadar.value, regiaoSelecionada.value)
  if (registros.value.length === 0) {
    toast.add({
      title: 'Valores não encontrados',
      description: 'Nenhum registro foi retornado para os filtros atuais.',
      icon: 'i-lucide-info'
    })
  }
}

// Exclusividade entre região e radar
watch(() => regiaoSelecionada.value, (v) => {
  if (v != null) selectedRadar.value = 'all'
})
watch(() => selectedRadar.value, (v) => {
  if (v != null && v !== 'all' && regiaoSelecionada.value != null) setRegiaoSelecionada(null)
})

watch([() => regiaoSelecionada.value, () => selectedRadar.value], () => {
  pesquisar()
})

const filtered = computed(() => {
  const regionId = regiaoSelecionada.value
  const radarId = selectedRadar.value
  return registros.value.filter(r => {
    if (regionId != null && r.regiao !== regionId) return false
    if (radarId && radarId !== 'all' && r.radar !== radarId) return false
    return true
  })
})

onMounted(() => {
  if (!selectedRadar.value) selectedRadar.value = 'all'
  pesquisar()
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
                <div class="flex flex-wrap gap-2">
                  <FiltersRegionSelect />
                  <FiltersRadarSelect />
                </div>
              </template>
            </UDashboardToolbar>
          </div>
          <div v-if="loading" class="flex items-center gap-2 px-4 py-6 text-muted">
            <UIcon name="i-lucide-loader-2" class="animate-spin h-5 w-5 text-primary" />
            <span>Carregando registros...</span>
          </div>
          <template v-else>
            <VelocidadeStats :period="period" :range="range" :dataset="filtered" />
            <VelocidadeChart :period="period" :range="range" :dataset="filtered" />
          </template>
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
