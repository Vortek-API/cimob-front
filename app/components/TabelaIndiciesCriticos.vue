<script setup lang="ts">
import { computed } from 'vue'
import { useIndicesCriticosAutoRefresh } from '~/composables/useIndicesCriticosAutoRefresh'

const props = withDefaults(defineProps<{ maxHeight?: string; limit?: number }>(), {
  limit: 3
})

type Linha = {
  endereco: string
  regiao: string
  intervalo: string
  velocidadePermitida: number
  velocidadeRegistrada: number
}

const { rows, isLoading, errorMsg } = useIndicesCriticosAutoRefresh()

const columns = [
  { accessorKey: 'endereco', header: 'Endereço do radar' },
  { accessorKey: 'regiao', header: 'Região' },
  { accessorKey: 'intervalo', header: 'Intervalo' },
  { accessorKey: 'velocidadePermitida', header: 'Vel. permitida (km/h)' },
  { accessorKey: 'velocidadeRegistrada', header: 'Vel. registrada (km/h)' }
]

const tableUi = {
  root: 'w-full',
  base: 'w-full table-auto',
  thead: 'bg-white',
  tbody: 'bg-white',
  th: 'sticky top-0 z-10 bg-white text-sm font-semibold text-gray-700 px-4 py-3',
  td: 'px-4 py-3 text-gray-800',
  tr: 'border-b border-gray-200 last:border-b-0',
  separator: 'border-t border-gray-200'
}

const visibleData = computed(() => rows.value.slice(0, props.limit))
</script>

<template>
  <div class="bg-white rounded-xl ring-1 ring-gray-200 shadow" :style="props.maxHeight ? { maxHeight: props.maxHeight, overflowY: 'auto' } : undefined">
    <div v-if="isLoading" class="p-4">
      <div class="flex items-center gap-3 text-gray-600">
        <svg class="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <span class="text-sm">Carregando índices críticos...</span>
      </div>
      <div class="mt-4 space-y-2">
        <div v-for="i in 3" :key="`s-${i}`" class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
      </div>
    </div>
    <div v-else-if="errorMsg" class="px-4 py-3 text-sm text-red-600">{{ errorMsg }}</div>
    <div v-else>
      <UTable :data="visibleData" :columns="columns" :ui="tableUi" />
    </div>
  </div>
  
</template>
