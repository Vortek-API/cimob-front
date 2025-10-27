<script setup lang="ts">
import { computed, useTemplateRef, ref, watchEffect } from 'vue'
import { format } from 'date-fns'
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'
import { useElementSize } from '@vueuse/core'
import type { Period, Range } from '../../types'

const cardRef = useTemplateRef<HTMLElement | null>('cardRef')

// Novo formato: { data, tipoVeiculo, velocidade }
// Para Velocidade, usamos a média de velocidade por dia (data).
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

// Agrega por dia calculando média de velocidade
watchEffect(() => {
  const items: ChartPoint[] = props.dataset && props.dataset.length ? props.dataset : [
    { data: new Date('2024-01-01'), velocidade: 42 },
    { data: new Date('2024-01-01'), velocidade: 38 },
    { data: new Date('2024-01-02'), velocidade: 55 },
  ]
  const sum = new Map<number, number>()
  const cnt = new Map<number, number>()
  for (const it of items) {
    const day = normalizeDay(it.data)
    const key = day.getTime()
    const v = typeof it.velocidade === 'number' ? it.velocidade : 0
    sum.set(key, (sum.get(key) || 0) + v)
    cnt.set(key, (cnt.get(key) || 0) + 1)
  }
  const orderedKeys = Array.from(sum.keys()).sort((a, b) => a - b)
  data.value = orderedKeys.map(ts => ({ date: new Date(ts), amount: cnt.get(ts)! ? sum.get(ts)! / cnt.get(ts)! : 0 }))
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
        <p class="text-xs text-muted uppercase mb-1.5">Velocidade média registrada</p>
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
