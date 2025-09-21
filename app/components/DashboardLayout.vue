<template>
  <main class="flex-1 bg-gray-100 p-8 overflow-auto min-h-screen">
    <ComponenteIndicadores />
    <div class="mt-6">
      <MenuRegiao />
    </div>
  </main>
  
</template>

<script setup lang="ts">
import ComponenteIndicadores from '~/components/ComponenteIndicadores.vue'
import MenuRegiao from '~/components/MenuRegiao.vue'
</script>

<style scoped>
</style>
