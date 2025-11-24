<template>
  <div class="flex h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <main class="flex-1 overflow-auto">
      <!-- Header Section -->
      <div class="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div class="px-6 md:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <div class="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
                <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Indicadores da Cidade
                </h1>
              </div>
              <p class="text-slate-600 text-sm md:text-base ml-4">Monitoramento em tempo real do trânsito urbano</p>
            </div>
            <div class="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span class="text-xs font-semibold text-blue-900">Sistema Ativo</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="p-6 md:p-8 w-full space-y-8">
        <!-- Dashboard Section -->
        <section class="space-y-4 animate-fade-in">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-6 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
              <div>
                <h2 class="text-xl md:text-2xl font-bold text-slate-900">Dashboard de Indicadores</h2>
                <p class="text-slate-500 text-sm mt-0.5">Visualize os principais indicadores de trânsito</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
            <DashboardLayout />
          </div>
        </section>

        <!-- Divisor Visual -->
        <div class="flex items-center gap-4 py-4">
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-widest px-4">Situação Crítica</span>
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        </div>

        <!-- Índices Críticos Section -->
        <section class="space-y-4 animate-fade-in" style="animation-delay: 100ms">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-6 bg-gradient-to-b from-red-600 to-orange-400 rounded-full"></div>
              <div>
                <h2 class="text-xl md:text-2xl font-bold text-slate-900">Índices Críticos</h2>
                <p class="text-slate-500 text-sm mt-0.5">Indicadores que requerem atenção imediata</p>
              </div>
            </div>
            <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
              <svg class="w-4 h-4 text-red-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-xs font-semibold text-red-900">Monitorar</span>
            </div>
          </div>

          <!-- Tabela de Índices Críticos -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300">
            <TabelaIndiciesCriticos max-height="calc(100vh - 450px)" />
          </div>
        </section>

        <!-- Info Box -->
        <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-2xl border border-blue-200 p-6 mt-8 animate-fade-in" style="animation-delay: 200ms">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-blue-900">💡 Dica</p>
              <p class="text-sm text-blue-700 mt-2">Clique nos indicadores para visualizar mais detalhes e histórico de dados. Os índices críticos são atualizados em tempo real para garantir o melhor monitoramento.</p>
            </div>
          </div>
        </div>

        <!-- Admin Alert Box -->
        <div v-if="auth.isAdmin" class="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 rounded-2xl border border-purple-200 p-6 animate-fade-in" style="animation-delay: 300ms">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-purple-900">🔐 Acesso Administrativo</p>
              <p class="text-sm text-purple-700 mt-2">Você tem acesso às funcionalidades administrativas. Acesse o painel de administrador para gerenciar logs, acessos e configurações do sistema. Você também pode acessar o grupo do Telegram para comunicação com a equipe.</p>
              <div class="flex gap-3 mt-4">
                <NuxtLink to="/admin/logs" class="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Painel Admin
                </NuxtLink>
                <a href="https://t.me/+rGmkfxYTzmYwYTMx" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a11.955 11.955 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.365-1.337.175-.437-.148-1.33-.414-1.98-.742-.798-.329-1.424-.608-1.369-1.056.025-.168.325-.337.893-.501 3.5-1.33 5.228-2.223 6.3-3.843.652-1.01 1.077-2.35.923-3.595-.140-1.174-1.555-2.752-3.144-2.678z"/>
                  </svg>
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/authStore'

definePageMeta({
  requiresAuth: true
})

const auth = useAuthStore()
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 400ms ease-out forwards;
  opacity: 0;
}
</style>
