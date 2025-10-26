<script setup lang="ts">
const { radars, selectedRadar, loadFilters } = useDashboard()
onMounted(loadFilters)
</script>

<template>
  <USelect v-model="selectedRadar" :items="radars" placeholder="Radar" />
</template>

