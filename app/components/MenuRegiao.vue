<script setup lang="ts">
import { reloadIndicadores } from '~/store/indicadores'
import { setRegiaoSelecionada } from '~/store/filtro'
import { fetchRegioes } from '~/services/regiao-api'
import { getCurrentWindowTimestampString } from '~/store/timestamp'
import { APP_CONFIG } from '~/config/app-config'
import type { Regiao } from '~/types/regiao'

const items = ref<Array<{label: string, value: number | null}>>([
  {
    label: 'Todas as regiões',
    value: null
  }
])

const value = ref(null)

onMounted(async () => {
  try {
    const regioes: Regiao[] = await fetchRegioes()
    const regioesFormatadas = regioes.map(regiao => ({
      label: regiao.nome,
      value: regiao.regiaoId
    }))
    items.value = [
      {
        label: 'Todas as regiões',
        value: null
      },
      ...regioesFormatadas
    ]
  } catch (error) {
    console.error('Erro ao carregar regiões:', error)
  }
})

let debounceTimer: number | null = null

watch(value, async (newValue) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  
  debounceTimer = setTimeout(async () => {
    setRegiaoSelecionada(newValue)
    const timestampAtual = getCurrentWindowTimestampString()
    await reloadIndicadores(newValue || undefined, timestampAtual)
  }, APP_CONFIG.FILTER_DEBOUNCE_MS)
})
</script>

<template>
  <USelect
    v-model="value"
    :items="items"
    color="primary"
    class="w-80 h-14 rounded-2xl text-lg ml-4 mt-4 md:mt-0"
    placeholder="Filtrar por região"
  />
</template>
