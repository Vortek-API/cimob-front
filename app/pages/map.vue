<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <main class="flex-1 bg-gray-100 overflow-auto">
      <Map />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
import Map from '~/components/Map.vue'

definePageMeta({
  requiresAuth: true
});
</script>
<style scoped>
</style>
