<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { reloadIndicadores } from '~/store/indicadores'
import { setRegiaoSelecionada } from '~/store/filtro'
import { fetchRegioes } from '~/services/regiao-api'
import { getCurrentWindowTimestampString } from '~/store/timestamp'
import { APP_CONFIG } from '~/config/app-config'
import type { Regiao } from '~/types/regiao'

type SelectItem = { label: string; value: number | null }

const items = ref<SelectItem[]>([
  { label: 'Todas as regiões', value: null }
])

const value = ref<number | null>(null)

onMounted(async () => {
  try {
    const regioes: Regiao[] = await fetchRegioes()
    const options = regioes.map(r => ({ label: r.nome, value: r.regiaoId }))
    items.value = [{ label: 'Todas as regiões', value: null }, ...options]
  } catch (e) {
    console.error('Erro ao carregar regiões:', e)
  }
})

let debounceTimer: number | undefined
watch(value, (newVal) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = window.setTimeout(async () => {
    setRegiaoSelecionada(newVal)
    const ts = getCurrentWindowTimestampString()
    await reloadIndicadores(newVal ?? undefined, ts)
  }, APP_CONFIG.FILTER_DEBOUNCE_MS)
})
</script>

<template>
  <USelect v-model="value" :items="items" placeholder="Região" />
  
</template>
