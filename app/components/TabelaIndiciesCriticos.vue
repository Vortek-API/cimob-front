<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { dataSelecionada } from '~/store/filtro'

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

const rows = ref<Linha[]>([])
const isLoading = ref(false)
const errorMsg = ref<string | null>(null)

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

async function loadData() {
  try {
    isLoading.value = true
    errorMsg.value = null
    const config = useRuntimeConfig()
    let url = `${config.public.API_URL}/indicadores/indices-criticos`
    const params = new URLSearchParams()
    if (dataSelecionada.value) params.append('dataInicial', dataSelecionada.value)
    if (params.toString()) url += `?${params.toString()}`

    const resp = await fetch(url)
    if (!resp.ok) throw new Error('Erro ao buscar índices críticos')
    const json = await resp.json() as Array<{ endereco: string; velocidadePermitida: number; velocidadeRegistrada: number; regiaoNome?: string | null; dataHora?: string | null }>
    rows.value = json.map(item => ({
      endereco: item.endereco || '—',
      regiao: item.regiaoNome || '—',
      intervalo: item.dataHora || '—',
      velocidadePermitida: item.velocidadePermitida,
      velocidadeRegistrada: item.velocidadeRegistrada,
    }))
  } catch (e: any) {
    errorMsg.value = e?.message || 'Erro ao buscar índices críticos'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadData)

let debounceTimer: number | null = null
watch(dataSelecionada, () => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => loadData(), 200)
})
</script>

<template>
  <div class="bg-white rounded-xl ring-1 ring-gray-200 shadow" :style="props.maxHeight ? { maxHeight: props.maxHeight, overflowY: 'auto' } : undefined">
    <div v-if="isLoading" class="px-4 py-3 text-sm text-gray-600">Carregando...</div>
    <div v-else-if="errorMsg" class="px-4 py-3 text-sm text-red-600">{{ errorMsg }}</div>
    <div v-else>
      <UTable :data="visibleData" :columns="columns" :ui="tableUi" />
    </div>
  </div>
  
</template>
