<script setup lang="ts">
import type { Period, Range } from '../../types'

const period = defineModel<Period>({ required: true })
defineProps<{ range: Range }>()
</script>

<template>
  <USelect
    v-model="period"
    :items="[
      { label: 'Dia', value: 'daily' },
      { label: 'Semana', value: 'weekly' },
      { label: 'Mês', value: 'monthly' }
    ]"
  />
</template>
