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
                <div class="w-1 h-8 bg-gradient-to-b from-orange-600 to-orange-400 rounded-full"></div>
                <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-900 to-orange-600 bg-clip-text text-transparent">
                  Eventos Externos
                </h1>
              </div>
              <p class="text-gray-600 text-sm md:text-base ml-4">Crie e gerencie eventos no mapa em tempo real</p>
            </div>
            <div class="hidden md:flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg border border-orange-200">
              <svg class="w-5 h-5 text-orange-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span class="text-xs font-semibold text-orange-900">Gerenciador de Eventos</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="p-6 md:p-8 w-full space-y-8">
        <!-- Tabs Navigation -->
        <div class="flex gap-2 border-b border-gray-200">
          <button
            @click="activeTab = 'criar'"
            :class="[
              'px-6 py-3 font-semibold transition-all border-b-2 flex items-center gap-2',
              activeTab === 'criar'
                ? 'text-orange-600 border-orange-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Criar Evento
          </button>
          <button
            @click="activeTab = 'listar'"
            :class="[
              'px-6 py-3 font-semibold transition-all border-b-2 flex items-center gap-2',
              activeTab === 'listar'
                ? 'text-orange-600 border-orange-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Listar Eventos
            <span v-if="eventoCount > 0" class="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">{{ eventoCount }}</span>
          </button>
        </div>

        <!-- Tab Content -->
        <Transition name="fade" mode="out-in">
          <!-- Criar Evento Tab -->
          <div v-if="activeTab === 'criar'" key="criar" class="max-w-2xl">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
              <EventoExternoForm 
                :evento-edicao="eventoEdicao"
                @evento-criado="onEventoCriado" 
                @cancelar-edicao="cancelarEdicao"
              />
            </div>
          </div>

          <!-- Listar Eventos Tab -->
          <div v-else-if="activeTab === 'listar'" key="listar" class="space-y-6">
            <!-- Filtros e Busca -->
            <div class="flex gap-4 flex-col md:flex-row">
              <div class="flex-1">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Buscar eventos por nome ou descrição..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
                />
              </div>
              <button
                @click="loadEventos"
                :disabled="isLoading"
                class="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-lg transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <svg v-if="!isLoading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <svg v-else class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                {{ isLoading ? 'Atualizando...' : 'Atualizar' }}
              </button>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading && filteredEventos.length === 0" class="flex justify-center py-16">
              <div class="text-center">
                <svg class="animate-spin h-12 w-12 text-orange-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <p class="text-gray-600 font-medium">Carregando eventos...</p>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="filteredEventos.length === 0" class="flex justify-center py-16">
              <div class="text-center">
                <svg class="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-gray-600 font-medium text-lg">Nenhum evento encontrado</p>
                <p class="text-gray-500 text-sm mt-1">Crie um novo evento para começar</p>
              </div>
            </div>

            <!-- Grid de Eventos -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <EventoCard
                v-for="evento in filteredEventos"
                :key="evento.eventoId"
                :evento="evento"
                @view-map="viewOnMap(evento)"
                @edit="editEvento(evento)"
                @delete="deleteEvento(evento.eventoId)"
              />
            </div>
          </div>
        </Transition>

        <!-- Footer Info -->
        <div class="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-6 mt-8">
          <div class="flex items-start gap-4">
            <svg class="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p class="text-sm font-semibold text-orange-900">Dica</p>
              <p class="text-sm text-orange-700 mt-1">Crie eventos com localização precisa (latitude e longitude) para visualizá-los no mapa. Os eventos aparecem como marcadores laranjas no mapa em tempo real.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Sidebar from '~/components/Sidebar.vue'
import EventoExternoForm from '~/components/eventos/EventoExternoForm.vue'
import EventoCard from '~/components/eventos/EventoCard.vue'
import { listarEventosExternos, deletarEvento } from '~/services/evento-api'
import type { Evento } from '~/types/evento'

definePageMeta({
  requiresAuth: true
})

const activeTab = ref('criar')
const eventoEdicao = ref<Evento | null>(null)
const eventos = ref<Evento[]>([])
const isLoading = ref(false)
const searchQuery = ref('')

const eventoCount = computed(() => eventos.value.length)

const filteredEventos = computed(() => {
  return eventos.value.filter(evento =>
    evento.nome.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    evento.descricao.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

onMounted(() => {
  loadEventos()
})

const loadEventos = async () => {
  isLoading.value = true
  try {
    eventos.value = await listarEventosExternos()
  } catch (error) {
    console.error('Erro ao carregar eventos:', error)
  } finally {
    isLoading.value = false
  }
}

const onEventoCriado = () => {
  loadEventos()
  activeTab.value = 'listar'
  eventoEdicao.value = null
}

const cancelarEdicao = () => {
  eventoEdicao.value = null
  activeTab.value = 'listar'
}

const viewOnMap = (evento: Evento) => {
  console.log('Ver no mapa:', evento)
  // Implementar navegação para o mapa com foco no evento
}

const editEvento = (evento: Evento) => {
  console.log('Editar evento:', evento)
  eventoEdicao.value = evento
  activeTab.value = 'criar'
}

const deleteEvento = async (eventoId: number) => {
  if (!confirm('Tem certeza que deseja deletar este evento?')) return

  try {
    await deletarEvento(eventoId)
    eventos.value = eventos.value.filter(e => e.eventoId !== eventoId)
  } catch (error) {
    console.error('Erro ao deletar evento:', error)
    alert('Erro ao deletar evento')
  }
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
