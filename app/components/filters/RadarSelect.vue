<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useDashboard } from '~/composables/useDashboard'
import { useRegistrosVelocidade } from '~/composables/useRegistrosVelocidade'
import { fetchRadars } from '~/services/radar-api'

const { radars, selectedRadar } = useDashboard()
const { radarOptions } = useRegistrosVelocidade()

function shorten(label: string): string {
  const max = 28
  return label.length > max ? `${label.slice(0, max - 3)}...` : label
}

onMounted(async () => {
  try {
    const list = await fetchRadars()
    if (list?.length) {
      radars.value = [
        { label: 'Todos', value: 'all' },
        ...list.map(r => ({ label: shorten(r.endereco || String(r.radarId)), value: String(r.radarId) }))
      ]
      return
    }
  } catch (e) {
    console.error('Erro ao carregar radares', e)
  }
  // Fallback para os radares presentes no dataset carregado
  radars.value = radarOptions.value.length ? radarOptions.value : [{ label: 'Todos', value: 'all' }]
})

// Se não veio da API, atualiza quando o dataset local mudar
watch(radarOptions, (opts) => {
  if (!radars.value.length || radars.value.length === 1) {
    radars.value = opts.length ? opts : [{ label: 'Todos', value: 'all' }]
  }
})
</script>

<template>
  <USelect
    v-model="selectedRadar"
    :items="radars"
    placeholder="Radar (endereços)"
    searchable
    searchable-placeholder="Buscar radar..."
    class="max-w-xs"
  />
</template>
