<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { setRegiaoSelecionada } from '~/store/filtro'
import { getCurrentWindowTimestampString } from '~/store/timestamp'
import { APP_CONFIG } from '~/config/app-config'
import { useRegistrosVelocidade } from '~/composables/useRegistrosVelocidade'
import { fetchRegioes } from '~/services/regiao-api'

type SelectItem = { label: string; value: number | null }

const { regiaoOptions } = useRegistrosVelocidade()
const itemsFromDataset = computed<SelectItem[]>(() => regiaoOptions.value.length ? regiaoOptions.value : [
  { label: 'Todas as regiões', value: null }
])
const items = ref<SelectItem[]>([{ label: 'Todas as regiões', value: null }])
const value = ref<number | null>(null)

onMounted(async () => {
  try {
    const regioes = await fetchRegioes()
    if (regioes?.length) {
      const options = regioes
        .map(r => ({ label: r.nome || `Região ${r.regiaoId}`, value: r.regiaoId }))
        .sort((a, b) => (a.value ?? 0) - (b.value ?? 0))
      items.value = [{ label: 'Todas as regiões', value: null }, ...options]
      return
    }
  } catch (e) {
    console.error('Erro ao carregar regiões', e)
  }
  items.value = itemsFromDataset.value
})

watch(itemsFromDataset, (opts) => {
  if (items.value.length <= 1) {
    items.value = opts
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
  <USelect
    v-model="value"
    :items="items"
    placeholder="Região"
  />
</template>
