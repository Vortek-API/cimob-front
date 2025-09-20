<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <main class="flex-1 bg-gray-100 p-8 overflow-auto">
      <h1 class="text-2xl font-bold mb-4">Usuários</h1>
      <slot />
      <CreateUser />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
import CreateUser from '~/components/CreateUser.vue'
</script>

<style scoped>
</style>
