<script setup lang="ts">
const { regions, selectedRegion, loadFilters } = useDashboard()
onMounted(loadFilters)
</script>

<template>
  <USelect v-model="selectedRegion" :items="regions" placeholder="Região" />
</template>

