<script setup lang="ts">
const items = ref([
  {
    label: 'Norte',
    value: 'norte'
  },
  {
    label: 'Sul',
    value: 'sul'
  },
  {
    label: 'Leste',
    value: 'leste'
  },
  {
    label: 'Oeste',
    value: 'oeste'
  },
  {
    label: 'Centro',
    value: 'centro'
  },
  {
    label: 'Cidade',
    value: 'cidade'
  }
])
const value = ref('Filtrar por região')
</script>

<template>
  <USelect
    v-model="value"
    :items="items"
    color="blue"
    class="mt-8 w-80 h-14 rounded-2xl text-lg"
  />
</template>
