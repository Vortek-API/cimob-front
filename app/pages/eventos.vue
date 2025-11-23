<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <main class="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto">
      <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center gap-3 mb-2">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <h1 class="text-3xl font-bold text-gray-900">Gerenciamento de Eventos</h1>
          </div>
          <p class="text-gray-600">Crie e gerencie eventos externos no mapa</p>
        </div>

        <!-- Tabs -->
        <div class="mb-6 flex gap-2 border-b border-gray-200">
          <button
            @click="activeTab = 'criar'"
            :class="[
              'px-6 py-3 font-medium transition-all border-b-2',
              activeTab === 'criar'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            ]"
          >
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Criar Evento
          </button>
          <button
            @click="activeTab = 'listar'"
            :class="[
              'px-6 py-3 font-medium transition-all border-b-2',
              activeTab === 'listar'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            ]"
          >
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Listar Eventos
          </button>
        </div>

        <!-- Tab Content -->
        <div class="space-y-6">
          <!-- Criar Evento Tab -->
          <Transition name="fade" mode="out-in">
            <div v-if="activeTab === 'criar'" key="criar">
              <EventoExternoForm @evento-criado="onEventoCriado" />
            </div>
          </Transition>

          <!-- Listar Eventos Tab -->
          <Transition name="fade" mode="out-in">
            <div v-if="activeTab === 'listar'" key="listar">
              <EventosExternosList @evento-deletado="onEventoDeletado" />
            </div>
          </Transition>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '~/components/Sidebar.vue'
import EventoExternoForm from '~/components/eventos/EventoExternoForm.vue'
import EventosExternosList from '~/components/eventos/EventosExternosList.vue'

definePageMeta({
  requiresAuth: true
})

const activeTab = ref('criar')

const onEventoCriado = () => {
  activeTab.value = 'listar'
}

const onEventoDeletado = () => {
  // Recarregar lista se necessário
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
