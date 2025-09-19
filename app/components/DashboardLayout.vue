<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <main class="flex-1 bg-gray-100 p-8 overflow-auto">
      <slot />
    </main>
  </div>
  
</template>

<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
</script>

<style scoped>
</style>
