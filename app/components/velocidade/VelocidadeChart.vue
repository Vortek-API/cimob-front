<script setup lang="ts">
import { computed, useTemplateRef, ref, watchEffect } from 'vue'
import { format } from 'date-fns'
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'
import { useElementSize } from '@vueuse/core'
import type { Range } from '../../types'

const cardRef = useTemplateRef<HTMLElement | null>('cardRef')

// Novo formato: { data, tipoVeiculo, velocidade }
// Para Velocidade, cada leitura é um ponto (minuto).
type ChartPoint = { data: string | Date; tipoVeiculo?: string; velocidade?: number }
const props = defineProps<{
  period?: never
  range?: Range
  dataset?: ChartPoint[]
}>()

type DataRecord = { date: Date; amount: number }

const { width } = useElementSize(cardRef)
const data = ref<DataRecord[]>([])

// Cada leitura vira um ponto ordenado por data/hora
watchEffect(() => {
  const items: ChartPoint[] = props.dataset && props.dataset.length ? props.dataset : [
    { data: new Date('2024-01-01T00:00:00'), velocidade: 42 },
    { data: new Date('2024-01-01T00:01:00'), velocidade: 38 },
    { data: new Date('2024-01-01T00:02:00'), velocidade: 55 }
  ]
  data.value = items
    .map(it => ({
      date: new Date(it.data),
      amount: typeof it.velocidade === 'number' ? it.velocidade : 0
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
})

const x = (_: DataRecord, i: number) => i
const y = (d: DataRecord) => d.amount
const total = computed(() => data.value.reduce((acc: number, { amount }) => acc + amount, 0))
const avg = computed(() => data.value.length ? Math.round(total.value / data.value.length) : 0)
const formatDate = (date: Date): string => format(date, 'dd/MM HH:mm')
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
