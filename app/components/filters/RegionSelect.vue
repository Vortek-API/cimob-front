<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { setRegiaoSelecionada } from '~/store/filtro'
import { getCurrentWindowTimestampString } from '~/store/timestamp'
import { APP_CONFIG } from '~/config/app-config'
import registros from '~/data/registros.json'

type SelectItem = { label: string; value: number | null }

const items = ref<SelectItem[]>([
  { label: 'Todas as regiões', value: null }
])

const value = ref<number | null>(null)

onMounted(() => {
  try {
    const ids = Array.from(new Set((registros as any[]).map(r => Number(r.regiaoId ?? r.regiao)).filter(v => !Number.isNaN(v)))) as number[]
    ids.sort((a, b) => a - b)
    const options = ids.map(id => ({ label: `Região ${id}`, value: id }))
    items.value = [{ label: 'Todas as regiões', value: null }, ...options]
  } catch (e) {
    console.error('Erro ao carregar regiões:', e)
  }
})

let debounceTimer: number | undefined
watch(value, (newVal) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = window.setTimeout(() => {
    setRegiaoSelecionada(newVal)
    // Mantém compatibilidade com fluxos que dependiam de timestamp
    const _ = getCurrentWindowTimestampString()
  }, APP_CONFIG.FILTER_DEBOUNCE_MS)
})
</script>

<template>
  <USelect v-model="value" :items="items" placeholder="Região" />
</template>
