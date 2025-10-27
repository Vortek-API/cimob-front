<script setup lang="ts">
import { onMounted } from 'vue'
import registros from '~/data/registros.json'

const { radars, selectedRadar } = useDashboard()

onMounted(() => {
  try {
    // Extrai ids únicos de radar a partir do dataset carregado
    const unique = Array.from(new Set((registros as any[]).map(r => r.radarId ?? r.radar).filter(Boolean))) as string[]
    radars.value = [
      { label: 'Todos', value: 'all' },
      ...unique.map(id => ({ label: String(id), value: String(id) }))
    ]
  } catch (e) {
    // Fallback simples
    radars.value = [
      { label: 'Todos', value: 'all' }
    ]
  }
})
</script>

<template>
  <USelect v-model="selectedRadar" :items="radars" placeholder="Radar" />
</template>
