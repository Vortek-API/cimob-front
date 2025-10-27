<script setup lang="ts">
import { ref, shallowRef, computed, watch } from 'vue'
import { sub } from 'date-fns'
import type { Period, Range } from '../../types'
import VeiculosDateRangePicker from '~/components/veiculos/VeiculosDateRangePicker.vue'
import VeiculosPeriodSelect from '~/components/veiculos/VeiculosPeriodSelect.vue'
import VeiculosStats from '~/components/veiculos/VeiculosStats.vue'
import VeiculosChart from '~/components/veiculos/VeiculosChart.vue'
import registros from '~/data/registros.json'
import { regiaoSelecionada, setRegiaoSelecionada } from '~/store/filtro'
const { selectedRadar } = useDashboard()

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})
const period = ref<Period>('daily')

definePageMeta({
  requiresAuth: true
})

// Suporta novo modelo vindo do JSON externo
type RegistroApi = {
  registroVelocidadeId?: string
  radarId?: string
  regiaoId?: string
  tipoVeiculo?: string
  velocidade?: string | number
  velocidadePermitida?: string | number
  data?: string | Date
  deletado?: string
}
type Registro = { data: string; tipoVeiculo: string; velocidade: number; radar: string; regiao: number }

function parseBrDateToISO(d: string | Date | undefined): string {
  if (!d) return new Date().toISOString().slice(0, 10)
  if (d instanceof Date) return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString().slice(0, 10)
  // esperado: dd/MM/yy
  const parts = d.split('/')
  if (parts.length === 3) {
    const [dd, mm, yy] = parts
    const day = Number(dd)
    const mon = Number(mm) - 1
    const year = 2000 + Number(yy)
    const dt = new Date(year, mon, day)
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).toISOString().slice(0, 10)
  }
  // fallback: tentar Date
  const dt = new Date(d)
  return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).toISOString().slice(0, 10)
}

const all: Registro[] = (registros as unknown as RegistroApi[]).map(r => ({
  data: parseBrDateToISO(r.data),
  tipoVeiculo: String(r.tipoVeiculo ?? ''),
  velocidade: Number(r.velocidade ?? 0),
  radar: String(r.radarId ?? (r as any).radar ?? ''),
  regiao: Number(r.regiaoId ?? (r as any).regiao ?? 0)
}))

// Exclusividade entre região e radar
watch(() => regiaoSelecionada.value, (v) => {
  if (v != null && selectedRadar.value) selectedRadar.value = null
})
watch(() => selectedRadar.value, (v) => {
  if (v != null && regiaoSelecionada.value != null) setRegiaoSelecionada(null)
})

const filtered = computed(() => {
  const s = range.value.start
  const e = range.value.end
  // Normaliza limites para incluir o dia inteiro
  const start = new Date(s.getFullYear(), s.getMonth(), s.getDate(), 0, 0, 0)
  const end = new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999)
  const regionId = regiaoSelecionada.value
  const radarId = selectedRadar.value
  return all.filter(r => {
    const d = new Date(r.data)
    if (d < start || d > end) return false
    if (regionId != null && r.regiao !== regionId) return false
    if (radarId && r.radar !== radarId) return false
    return true
  })
})
</script>

<template>
  <UDashboardGroup class="min-h-screen">
    <Sidebar />
    <UDashboardPage class="dashboard-full dashboard-scroll w-full min-w-0 !max-w-none !px-0">
      <UDashboardPanel id="veiculos" class="w-full">
        <template #body>
          <div class="px-2 py-3">
            <h1 class="text-4xl font-semibold text-[#1b3b82]">Veículos</h1>
          </div>
          <div>
            <UDashboardToolbar>
              <template #left>
                <VeiculosDateRangePicker v-model="range" />
                <FiltersRegionSelect />
                <FiltersRadarSelect />
              </template>
              <template #right>
                <div class="flex items-center border-l border-default pl-3 ml-2">
                  <VeiculosPeriodSelect v-model="period" :range="range" />
                </div>
              </template>
            </UDashboardToolbar>
          </div>
          <VeiculosStats :period="period" :range="range" :dataset="filtered" />
          <VeiculosChart :period="period" :range="range" :dataset="filtered" />
        </template>
      </UDashboardPanel>
    </UDashboardPage>
  </UDashboardGroup>
</template>

<style scoped>
.dashboard-full :deep(.container) {
  max-width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.dashboard-scroll {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
