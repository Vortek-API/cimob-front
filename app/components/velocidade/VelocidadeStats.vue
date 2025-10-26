<script setup lang="ts">
import { computed } from 'vue'
import type { Period, Range, Stat } from '../../types'
const { selectedRegion, selectedRadar } = useDashboard()

const props = defineProps<{ period: Period; range: Range }>()

function formatPercentage(value: number): string {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(value) + '%'
}

const baseStats = [
  { title: 'Velocidade Média', icon: 'i-lucide-gauge', value: 100, info: 'Média de velocidade nas leituras do período.' },
  { title: 'Maior Registrado', icon: 'i-lucide-trending-up', value: 300, info: 'Maior velocidade registrada no período.' },
  { title: '% Acima da média', icon: 'i-lucide-triangle-alert', value: 15, info: 'Percentual de ocorrências acima do limite legal.', formatter: formatPercentage },
  { title: '% Abaixo da média', icon: 'i-lucide-trending-down', value: 8, info: 'Percentual de ocorrências abaixo do limite legal.', formatter: formatPercentage },
]

const stats = computed<Stat[]>(() => {
  // depend on region/radar to recompute
  const _r = selectedRegion.value; const _rd = selectedRadar.value
  return baseStats.map((stat) => ({
    title: stat.title,
    icon: stat.icon,
    value: stat.formatter ? stat.formatter(stat.value as number) : stat.value,
    variation: 0
  }))
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
        <UTooltip :text="baseStats[index].info">
          <UIcon name="i-lucide-help-circle" class="size-4 text-[#1b3b82]/70 hover:text-[#1b3b82] cursor-help" />
        </UTooltip>
      </div>
      <p class="font-normal text-muted text-xs uppercase">{{ baseStats[index].title }}</p>
      <div class="flex items-center mt-1.5">
        <span class="text-2xl font-semibold text-highlighted">{{ stat.value }}</span>
      </div>
    </UPageCard>
  </UPageGrid>
</template>
