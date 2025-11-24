<template>
  <div class="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:border-orange-200">
    <!-- Gradient Background on Hover -->
    <div class="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

    <!-- Badge de tipo -->
    <div class="absolute top-4 right-4 z-10">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border border-orange-200">
        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
        </svg>
        Evento
      </span>
    </div>

    <!-- Conteúdo -->
    <div class="p-5 relative z-10">
      <!-- Título e Descrição -->
      <h3 class="text-lg font-bold text-gray-900 mb-2 pr-20 line-clamp-2 group-hover:text-orange-600 transition-colors">{{ evento.nome }}</h3>
      <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ evento.descricao }}</p>

      <!-- Informações -->
      <div class="space-y-2 mb-4 text-sm">
        <div class="flex items-center gap-2 text-gray-700">
          <svg class="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span class="font-medium">{{ formatDate(evento.data) }}</span>
        </div>
        <div class="flex items-center gap-2 text-gray-700">
          <svg class="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
      </div>

      <!-- Regiões -->
      <div v-if="evento.regioes && evento.regioes.length > 0" class="mb-4">
        <p class="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wider">Regiões</p>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="regiao in evento.regioes.slice(0, 2)"
            :key="regiao.regiaoId"
            class="inline-block px-2.5 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200"
          >
            {{ regiao.nome }}
          </span>
          <span
            v-if="evento.regioes.length > 2"
            class="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full border border-gray-200"
          >
            +{{ evento.regioes.length - 2 }} mais
          </span>
        </div>
      </div>

      <!-- Botões -->
      <div class="flex gap-2 pt-4 border-t border-gray-100">
        <button
          @click="$emit('view-map')"
          class="flex-1 px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-600 hover:text-blue-700 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 border border-blue-200 hover:border-blue-300"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6.553 3.276A1 1 0 0021 20.382V9.618a1 1 0 00-1.447-.894L15 11m0 13V11m0 0L9 7"></path>
          </svg>
          Mapa
        </button>
        <button
          @click="$emit('edit')"
          class="flex-1 px-3 py-2 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-green-600 hover:text-green-700 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 border border-green-200 hover:border-green-300"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Editar
        </button>
        <button
          @click="$emit('delete')"
          class="flex-1 px-3 py-2 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-600 hover:text-red-700 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 border border-red-200 hover:border-red-300"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          Deletar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EventoExterno } from '~/services/evento-api'

defineProps<{
  evento: EventoExterno & { regioes?: Array<{ regiaoId: number; nome: string }> }
}>()

defineEmits(['view-map', 'edit', 'delete'])

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
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
