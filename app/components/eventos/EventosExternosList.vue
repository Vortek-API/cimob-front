<template>
  <div class="w-full">
    <UCard class="shadow-lg border border-gray-200">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h2 class="text-xl font-bold text-gray-900">Eventos Externos</h2>
          </div>
          <button
            @click="loadEventos"
            :disabled="isLoading"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <svg v-if="!isLoading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <svg v-else class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Atualizar
          </button>
        </div>
      </template>

      <!-- Loading State -->
      <div v-if="isLoading && eventos.length === 0" class="flex justify-center py-12">
        <div class="text-center">
          <svg class="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <p class="text-gray-600">Carregando eventos...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="eventos.length === 0" class="flex justify-center py-12">
        <div class="text-center">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="text-gray-600 font-medium">Nenhum evento externo criado</p>
          <p class="text-gray-500 text-sm mt-1">Crie um novo evento para começar</p>
        </div>
      </div>

      <!-- Events List -->
      <div v-else class="space-y-4">
        <div
          v-for="evento in eventos"
          :key="evento.eventoId"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900">{{ evento.nome }}</h3>
              <p class="text-sm text-gray-600 mt-1">{{ evento.descricao }}</p>
            </div>
            <button
              @click="deleteEvento(evento.eventoId)"
              :disabled="deletingId === evento.eventoId"
              class="ml-4 px-3 py-2 bg-red-100 hover:bg-red-200 disabled:bg-gray-200 text-red-600 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <svg v-if="deletingId !== evento.eventoId" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              <svg v-else class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              {{ deletingId === evento.eventoId ? 'Deletando...' : 'Deletar' }}
            </button>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-3 text-sm">
            <div>
              <p class="text-gray-600">Data</p>
              <p class="font-medium text-gray-900">{{ formatDate(evento.dataInicio) }}</p>
            </div>
            <div>
            </div>
          </div>

          <!-- Regiões -->
          <div v-if="evento.regioes && evento.regioes.length > 0" class="mb-3">
            <p class="text-sm text-gray-600 mb-2">Regiões Afetadas</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="regiao in evento.regioes"
                :key="regiao.regiaoId"
                class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
              >
                {{ regiao.nome }}
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2 pt-3 border-t border-gray-100">
            <button
              @click="editEvento(evento)"
              class="flex-1 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-600 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Editar
            </button>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { listarEventosExternos, deletarEvento } from '~/services/evento-api'
import type { Evento } from '~/types/evento'

const eventos = ref<Evento[]>([])
const isLoading = ref(false)
const deletingId = ref<number | null>(null)

const emit = defineEmits(['evento-deletado', 'edit-evento'])

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

const formatDate = (date: any) => {
  if (!date) return '-'
  const d = new Date(date)
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const deleteEvento = async (eventoId: number) => {
  if (!confirm('Tem certeza que deseja deletar este evento?')) return

  deletingId.value = eventoId
  try {
    await deletarEvento(eventoId)
    eventos.value = eventos.value.filter(e => e.eventoId !== eventoId)
    emit('evento-deletado')
  } catch (error) {
    console.error('Erro ao deletar evento:', error)
    alert('Erro ao deletar evento')
  } finally {
    deletingId.value = null
  }
}

const viewOnMap = (evento: Evento) => {
  // Implementar navegação para o mapa com foco no evento
  console.log('Ver no mapa:', evento)
}

const editEvento = (evento: Evento) => {
  emit('edit-evento', evento)
}
</script>

<style scoped>
</style>
