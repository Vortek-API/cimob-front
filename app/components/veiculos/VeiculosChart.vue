<script setup lang="ts">
import { computed, useTemplateRef, ref, watchEffect } from 'vue'
import { format } from 'date-fns'
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'
import { useElementSize } from '@vueuse/core'
import type { Period, Range } from '../../types'

const cardRef = useTemplateRef<HTMLElement | null>('cardRef')

// Novo formato: { data, tipoVeiculo, velocidade }
// Para Veículos, contamos ocorrências por dia (data), independente do tipo neste gráfico simples.
type ChartPoint = { data: string | Date; tipoVeiculo?: string; velocidade?: number }
const props = withDefaults(defineProps<{
  period?: Period
  range?: Range
  dataset?: ChartPoint[]
}>(), { period: 'daily' })

type DataRecord = { date: Date; amount: number }

const { width } = useElementSize(cardRef)
const data = ref<DataRecord[]>([])

function normalizeDay(d: string | Date) {
  const dt = new Date(d)
  return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())  
}

// Agrega por dia, contando registros
watchEffect(() => {
  const items: ChartPoint[] = props.dataset && props.dataset.length ? props.dataset : [
    { data: new Date('2024-01-01'), tipoVeiculo: 'Carro' },
    { data: new Date('2024-01-02'), tipoVeiculo: 'Moto' },
    { data: new Date('2024-01-01'), tipoVeiculo: 'Caminhão' },
    { data: new Date('2024-01-02'), tipoVeiculo: 'Carro' },
  ]
  const agg = new Map<number, number>()
  for (const it of items) {
    const day = normalizeDay(it.data)
    const key = day.getTime()
    agg.set(key, (agg.get(key) || 0) + 1)
  }
  const ordered = Array.from(agg.entries()).sort((a, b) => a[0] - b[0])
  data.value = ordered.map(([ts, amount]) => ({ date: new Date(ts), amount }))
})

const x = (_: DataRecord, i: number) => i
const y = (d: DataRecord) => d.amount
const total = computed(() => data.value.reduce((acc: number, { amount }) => acc + amount, 0))
const avg = computed(() => data.value.length ? Math.round(total.value / data.value.length) : 0)
const formatDate = (date: Date): string => ({ daily: format(date, 'd MMM'), weekly: format(date, 'd MMM'), monthly: format(date, 'MMM yyy') }[props.period!])
const xTicks = (i: number) => (i === 0 || i === data.value.length - 1 || !data.value[i] ? '' : formatDate(data.value[i].date))
const template = (d: DataRecord) => `${formatDate(d.date)}: ${Math.round(d.amount)}`
</script>

<template>
  <UCard ref="cardRef" :ui="{ root: 'overflow-visible', body: '!px-0 !pt-0 !pb-3' }">
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">Veículos Registrados</p>
      </div>
    </template>

    <VisXYContainer :data="data" :padding="{ top: 40 }" class="h-96" :width="width">
      <VisLine :x="x" :y="y" color="var(--ui-primary)" />
      <VisArea :x="x" :y="y" color="var(--ui-primary)" :opacity="0.1" />
      <VisAxis type="x" :x="x" :tick-format="xTicks" />
      <VisCrosshair color="var(--ui-primary)" :template="template" />
      <VisTooltip />
    </VisXYContainer>
  </UCard>
</template>

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: var(--ui-primary);
  --vis-crosshair-circle-stroke-color: var(--ui-bg);
  --vis-axis-grid-color: var(--ui-border);
  --vis-axis-tick-color: var(--ui-border);
  --vis-axis-tick-label-color: var(--ui-text-dimmed);
  --vis-tooltip-background-color: var(--ui-bg);
  --vis-tooltip-border-color: var(--ui-border);
  --vis-tooltip-text-color: var(--ui-text-highlighted);
}
</style>
