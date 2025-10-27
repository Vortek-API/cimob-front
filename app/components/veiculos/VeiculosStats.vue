<script setup lang="ts">
import { computed } from 'vue'
import type { Period, Range, Stat } from '../../types'

const props = defineProps<{ period: Period; range: Range; dataset?: Array<{ data: string | Date; tipoVeiculo?: string; velocidade?: number; radar?: string; regiao?: number }> }>()

function formatPercentage(value: number): string {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(value) + '%'
}

const info = [
  'Quantidade de tipos de veículos registrados no período.',
  'Tipo de veículo mais registrado no período.',
  'Percentual do tipo mais registrado no período.',
  'Tipo de veículo menos registrado no período.'
]

const stats = computed<Stat[]>(() => {
  const ds = props.dataset ?? []
  const tipos = ds.map(d => d.tipoVeiculo).filter(Boolean) as string[]
  const total = tipos.length
  const unique = new Set(tipos).size
  const counts = new Map<string, number>()
  for (const t of tipos) counts.set(t, (counts.get(t) || 0) + 1)
  let top = ''
  let topCount = 0
  let low = ''
  let lowCount = Infinity
  for (const [t, c] of counts) {
    if (c > topCount) { top = t; topCount = c }
    if (c < lowCount) { low = t; lowCount = c }
  }
  const topPct = total ? Math.round((topCount / total) * 100) : 0

  const out: Stat[] = [
    { title: 'Total de tipos de veículos', icon: 'i-lucide-gauge', value: unique, variation: 0 },
    { title: 'Veículo mais registrado', icon: 'i-lucide-trending-up', value: top || '—', variation: 0 },
    { title: '% do veículo mais registrado', icon: 'i-lucide-trending-up', value: formatPercentage(topPct), variation: 0 },
    { title: 'Veículo menos registrado', icon: 'i-lucide-triangle-alert', value: low || '—', variation: 0 }
  ]
  return out
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
