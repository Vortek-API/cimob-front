<template>
  <section class="space-y-8">
    <!-- GRID DE CARTÕES -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- ESTADO DE CARREGAMENTO -->
      <template v-if="isLoadingIndicadores">
        <div v-for="n in 3" :key="`skeleton-${n}`" class="w-full bg-white rounded-lg border border-gray-200 p-6 shadow-sm overflow-hidden">
          <div class="space-y-4">
            <!-- Skeleton: Indicador -->
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full bg-gradient-to-r from-gray-300 to-gray-200 animate-pulse"></div>
              <div class="h-4 w-32 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded animate-pulse"></div>
            </div>
            
            <!-- Skeleton: Valor Principal -->
            <div class="py-6 text-center">
              <div class="h-12 w-24 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg mx-auto animate-pulse"></div>
            </div>

            <!-- Skeleton: Descrição -->
            <div class="space-y-2">
              <div class="h-3 w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div class="h-3 w-4/5 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </template>

      <!-- ESTADO DE ERRO -->
      <template v-else-if="indicadoresError">
        <div class="col-span-full bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-6 shadow-sm">
          <div class="flex items-start gap-4">
            <svg class="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p class="text-sm font-semibold text-red-900">Erro ao carregar indicadores</p>
              <p class="text-sm text-red-700 mt-1">{{ indicadoresError }}</p>
            </div>
          </div>
        </div>
      </template>

      <!-- CARTÕES DE INDICADORES -->
      <template v-else>
        <div
          v-for="card in cards"
          :key="card.id"
          @click="abrirDetalhes(card)"
          class="group w-full bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden relative cursor-pointer"
        >
          <!-- Fundo Decorativo (Gradiente Sutil) -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/0 group-hover:from-blue-50 group-hover:to-blue-100/50 transition-all duration-300 pointer-events-none"></div>

          <!-- Conteúdo do Cartão -->
          <div class="relative z-10">
            <!-- Header: Indicador -->
            <div class="flex items-center gap-3 mb-4">
              <span :class="['w-3 h-3 rounded-full ring-2 ring-offset-2 transition-transform duration-300 group-hover:scale-125', card.circulo]" />
              <span class="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{{ card.indicador }}</span>
            </div>

            <!-- Valor Principal -->
            <div class="py-4 text-center mb-2">
              <div class="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent leading-none">
                {{ card.valor }}
              </div>
            </div>

            <!-- Descrição (Opcional) -->
            <div v-if="(card as any).descricao" class="text-center text-xs text-gray-500 group-hover:text-gray-600 transition-colors line-clamp-2">
              {{ (card as any).descricao }}
            </div>

            <!-- Indicador de Clique -->
            <div class="text-center mt-4">
              <p class="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Ver detalhes
              </p>
            </div>
          </div>

          <!-- Barra de Destaque (Bottom) -->
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
      </template>
    </div>

    <!-- Mensagem de Vazio -->
    <div v-if="!isLoadingIndicadores && !indicadoresError && cards.length === 0" class="col-span-full bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
      <svg class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p class="text-gray-500 text-sm">Nenhum indicador disponível no momento</p>
    </div>
  </section>

  <!-- MODAL DE DETALHES -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modalAberto" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Transition name="slide-up">
          <div v-if="modalAberto" class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <!-- Header do Modal -->
            <div class="sticky top-0 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 px-6 md:px-8 py-6 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <span :class="['w-4 h-4 rounded-full ring-2 ring-offset-2', indicadorSelecionado?.circulo]" />
                <div>
                  <h2 class="text-2xl font-bold text-gray-900">{{ indicadorSelecionado?.indicador }}</h2>
                  <p class="text-sm text-gray-600 mt-1">Detalhes do Indicador</p>
                </div>
              </div>
              <button
                @click="fecharModal"
                class="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-white rounded-lg"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <!-- Conteúdo do Modal -->
            <div class="px-6 md:px-8 py-8">
              <!-- Valor Principal -->
              <div class="text-center mb-8">
                <p class="text-gray-600 text-sm font-medium mb-2">Valor Atual</p>
                <div class="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
                  {{ indicadorSelecionado?.valor }}
                </div>
              </div>

              <!-- Descrição -->
              <div class="mb-8">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
                <p class="text-gray-700 leading-relaxed text-base">
                  {{ indicadorSelecionado?.descricao || 'Nenhuma descrição disponível.' }}
                </p>
              </div>

              <!-- Informações Adicionais (se disponíveis) -->
              <!-- <div v-if="indicadorSelecionado?.detalhes" class="mb-8">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Informações Adicionais</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="(valor, chave) in indicadorSelecionado.detalhes" :key="chave" class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p class="text-xs font-medium text-gray-600 uppercase tracking-wide">{{ chave }}</p>
                    <p class="text-lg font-semibold text-gray-900 mt-1">{{ valor }}</p>
                  </div>
                </div>
              </div> -->

              <!-- Rodapé do Modal -->
              <div class="border-t border-gray-200 pt-6 flex gap-3">
                <button
                  @click="fecharModal"
                  class="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cards, isLoadingIndicadores, indicadoresError, type Card } from '~/store/indicadores'
import { useIndicadoresAutoRefresh } from '~/composables/useIndicadoresAutoRefresh'
import type { Indicador } from '~/types/indicador'

useIndicadoresAutoRefresh()

// Estado do Modal
const modalAberto = ref(false)
const indicadorSelecionado = ref<Card>();

// Funções do Modal
const abrirDetalhes = (card: Card) => {
  indicadorSelecionado.value = card
  modalAberto.value = true
  // Prevenir scroll do body quando modal está aberto
  document.body.style.overflow = 'hidden'
}

const fecharModal = () => {
  modalAberto.value = false
  // Restaurar scroll do body
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
/* Transições do Modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* Estilo para limitar linhas de texto */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
