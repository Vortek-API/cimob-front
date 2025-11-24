<template>
  <div class="flex min-h-screen bg-white">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content - Full Height Map -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Header com informações -->
      <div class="bg-gradient-to-r from-white via-blue-50 to-white border-b border-slate-200 shadow-sm p-4 md:p-6 z-20">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                Mapa Interativo
              </h1>
              <p class="text-sm text-slate-600 mt-1">Visualize radares e pontos de ônibus em tempo real</p>
            </div>
          </div>
          <div class="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span class="text-xs font-semibold text-blue-900">Mapa Ativo</span>
          </div>
        </div>
      </div>

      <!-- Map Container - Full Height -->
      <div class="flex-1 relative overflow-hidden">
        <Map />
      </div>
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
/* Garantir que o mapa ocupe toda a altura disponível */
main {
  height: calc(100vh);
}
</style>
