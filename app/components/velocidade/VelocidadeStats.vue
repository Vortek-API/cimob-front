<script setup lang="ts">
import { computed } from 'vue'
import type { Period, Range, Stat } from '../../types'

const props = defineProps<{ period: Period; range: Range; dataset?: Array<{ data: string | Date; tipoVeiculo?: string; velocidade?: number; velocidadePermitida?: number; radar?: string; regiao?: number }> }>()

function pct(n: number): string {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(n) + '%'
}

const info = [
  'Média de velocidade nas leituras do período.',
  'Maior velocidade registrada no período.',
  'Percentual de ocorrências acima da média.',
  'Limite de velocidade (média do permitido)'
]

const stats = computed<Stat[]>(() => {
  const ds = (props.dataset ?? [])
  const speeds = ds.map(d => typeof d.velocidade === 'number' ? d.velocidade : 0)
  const total = speeds.length
  const avg = total ? speeds.reduce((a, b) => a + b, 0) / total : 0
  const max = total ? Math.max(...speeds) : 0
  const above = total ? Math.round((speeds.filter(v => v > avg).length / total) * 100) : 0
  // Média do limite de velocidade (velocidadePermitida)
  const limits = ds.map(d => typeof d.velocidadePermitida === 'number' ? d.velocidadePermitida : 0).filter(v => v > 0)
  const limitAvg = limits.length ? Math.round(limits.reduce((a, b) => a + b, 0) / limits.length) : 0
  return [
    { title: 'Velocidade Média', icon: 'i-lucide-gauge', value: Math.round(avg), variation: 0 },
    { title: 'Maior Registrado', icon: 'i-lucide-trending-up', value: max, variation: 0 },
    { title: '% Acima da média', icon: 'i-lucide-triangle-alert', value: pct(above), variation: 0 },
    { title: 'Limite de velocidade', icon: 'i-lucide-gauge', value: limitAvg, variation: 0 }
  ]
})
</script>

<template>
  <UPageGrid class="lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px">
    <UPageCard
      v-for="(stat, index) in stats"
      :key="index"
      variant="subtle"
      :ui="{ root: 'relative', container: 'gap-y-1.5', wrapper: 'items-start', title: 'font-normal text-muted text-xs uppercase' }"
      class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
    >
      <!-- Header do card: ícone principal à esquerda e info à direita -->
      <div class="flex items-start justify-between w-full">
        <div class="inline-flex items-center justify-center size-9 rounded-full bg-primary/10 ring ring-inset ring-primary/25">
          <UIcon :name="stat.icon" class="size-5 text-primary" />
        </div>
        <UTooltip :text="info[index]">
          <UIcon name="i-lucide-help-circle" class="size-4 text-[#1b3b82]/70 hover:text-[#1b3b82] cursor-help" />
        </UTooltip>
      </div>
      <p class="font-normal text-muted text-xs uppercase">{{ stat.title }}</p>
      <div class="flex items-center mt-1.5">
        <span class="text-2xl font-semibold text-highlighted">{{ stat.value }}</span>
      </div>
    </UPageCard>
  </UPageGrid>
</template>
