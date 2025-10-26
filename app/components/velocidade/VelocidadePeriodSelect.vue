<script setup lang="ts">
import type { Period, Range } from '../../types'

const period = defineModel<Period>({ required: true })
defineProps<{ range: Range }>()
</script>

<template>
  <USelect
    v-model="period"
    :items="[
      { label: 'Daily', value: 'daily' },
      { label: 'Weekly', value: 'weekly' },
      { label: 'Monthly', value: 'monthly' }
    ]"
  />
</template>
