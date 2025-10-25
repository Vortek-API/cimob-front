<template>
  <div class="flex h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <main class="flex-1 overflow-auto">
      <!-- Header Section com Gradiente -->
      <div class="sticky top-0 z-40 bg-gradient-to-r from-white via-blue-50 to-white border-b border-gray-200/50 shadow-sm backdrop-blur-md">
        <div class="px-6 md:px-8 py-8">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <div class="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
                <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                  Indicadores da Cidade
                </h1>
              </div>
              <p class="text-gray-600 text-sm md:text-base ml-4">Visualize e analise os indicadores em tempo real</p>
            </div>
            <div class="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
              <svg class="w-5 h-5 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span class="text-xs font-semibold text-blue-900">Em Tempo Real</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="p-6 md:p-8 w-full space-y-8">
        <!-- Dashboard Layout Section -->
        <section class="space-y-4">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-1 h-6 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
            <h2 class="text-xl md:text-2xl font-bold text-gray-900">Dashboard de Indicadores</h2>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
            <DashboardLayout />
          </div>
        </section>

        <!-- Divisor Visual -->
        <div class="flex items-center gap-4">
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-widest">Análise Crítica</span>
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        <!-- Índices Críticos Section -->
        <section class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-1 h-6 bg-gradient-to-b from-red-600 to-orange-400 rounded-full"></div>
              <div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900">Índices Críticos</h2>
                <p class="text-gray-600 text-sm mt-1">Indicadores que requerem atenção imediata</p>
              </div>
            </div>
            <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-lg border border-red-200">
              <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-xs font-semibold text-red-900">Monitorar</span>
            </div>
          </div>

          <!-- Tabela de Índices Críticos com Card -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            <TabelaIndiciesCriticos max-height="calc(100vh - 450px)" />
          </div>
        </section>

        <!-- Footer Info -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 mt-8">
          <div class="flex items-start gap-4">
            <svg class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p class="text-sm font-semibold text-blue-900">Dica</p>
              <p class="text-sm text-blue-700 mt-1">Clique nos indicadores para visualizar mais detalhes e histórico de dados. Os índices críticos são atualizados em tempo real.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  requiresAuth: true
})
</script>

<style scoped>
/* Animação de pulse suave */
@keyframes gentle-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: gentle-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Transição suave para shadows */
.transition-shadow {
  transition: box-shadow 0.3s ease;
}
</style>
