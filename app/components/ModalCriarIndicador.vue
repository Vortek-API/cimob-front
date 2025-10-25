<template>
  <div 
    @click="$emit('fechar')" 
    class="fixed inset-0 backdrop-blur-sm bg-opacity-20 flex items-center justify-center z-50 transition-opacity"
  >
    <div @click.stop class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
      <h2 class="text-2xl font-bold text-blue-900 mb-2">Selecionar Indicadores</h2>
      <p class="text-gray-600 mb-2">Clique em até 3 indicadores para visualizar seus detalhes.</p>
      <p class="text-sm text-blue-600 font-semibold mb-6">Selecionados: {{ indicadoresSelecionados.length }}/3</p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div
            v-for="indicator in indicators"
            :key="indicator.id"
            @click="toggleSelecao(indicator)"
            :class="[
              'border-2 rounded-xl p-4 cursor-pointer transition-all duration-300',
              estaSelecionado(indicator) 
                ? 'border-blue-500 bg-blue-50 shadow-lg' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            ]"
            :style="{ opacity: !estaSelecionado(indicator) && indicadoresSelecionados.length >= 3 ? 0.5 : 1, pointerEvents: !estaSelecionado(indicator) && indicadoresSelecionados.length >= 3 ? 'none' : 'auto' }"
          >
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 mt-1">
                <div :class="[
                  'w-5 h-5 border-2 rounded flex items-center justify-center',
                  estaSelecionado(indicator) ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                ]">
                  <svg v-if="estaSelecionado(indicator)" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-gray-800">{{ indicator.nome }}</h3>
                <p class="text-sm text-gray-600 mt-1 line-clamp-2">{{ indicator.descricao }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
          <h3 class="text-xl font-bold text-blue-900 mb-4">Detalhes Selecionados</h3>
          
          <div v-if="indicadoresSelecionados.length > 0" class="space-y-3">
            <div 
              v-for="(indicator, index) in indicadoresSelecionados" 
              :key="indicator.id"
              class="bg-white p-4 rounded-lg border border-blue-200"
            >
              <!-- CABEÇALHO DO ACORDEÃO -->
              <div class="flex items-start justify-between mb-3 cursor-pointer" @click="toggleDetalhe(indicator.id)">
                <h4 class="font-bold text-gray-800 flex-1">{{ index + 1 }}. {{ indicator.nome }}</h4>
                <div class="flex items-center space-x-3">
                  <!-- Ícone de Expansão/Contração -->
                  <svg 
                    :class="['w-5 h-5 text-blue-600 transition-transform', { 'rotate-180': detalheAberto === indicator.id }]"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  <button 
                    @click.stop="removerSelecao(indicator)"
                    class="text-red-500 hover:text-red-700 font-bold text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <!-- CORPO DO ACORDEÃO (DETALHES) -->
              <div v-if="detalheAberto === indicator.id" class="pt-3 border-t border-gray-100 mt-3 space-y-3 text-sm">
                <div>
                  <label class="font-semibold text-gray-700">Descrição</label>
                  <p class="text-gray-800 mt-1">{{ indicator.descricao }}</p>
                </div>

                <div>
                  <label class="font-semibold text-gray-700">Fórmula de Cálculo</label>
                  <p class="text-gray-800 mt-1 font-mono bg-gray-100 p-2 rounded border border-gray-300 text-xs">
                    {{ indicator.formula }}
                  </p>
                </div>

                <div>
                  <label class="font-semibold text-gray-700">Unidade</label>
                  <p class="text-gray-800 mt-1">{{ indicator.unidade }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="flex items-center justify-center py-8">
            <p class="text-gray-500 text-center">Selecione até 3 indicadores para visualizar os detalhes.</p>
          </div>

          <div class="mt-6 flex gap-3">
            <button 
              @click="$emit('fechar')" 
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              @click="confirmarSelecao"
              :disabled="indicadoresSelecionados.length === 0"
              :class="[
                'flex-1 font-semibold py-2 px-4 rounded-lg transition-colors',
                indicadoresSelecionados.length === 0 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-800 text-white'
              ]"
            >
              OK ({{ indicadoresSelecionados.length }}/3)
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchAtualizaSelecionados, fetchIndicadoresSemCalculo } from '~/services/indicador-api'
import type { Indicador } from '~/types/indicador';

const emit = defineEmits(['fechar', 'salvar'])

interface Indicator {
  id: number;
  nome: string;
  descricao: string;
  oculto: boolean;
  // formula: string;
  // unidade: string;
}

const indicators = ref<Indicator[]>([])
const indicadoresSelecionados = ref<Indicator[]>([])
const detalheAberto = ref<number | null>(null)

onMounted(async () => {
  try {
    const data = await fetchIndicadoresSemCalculo()
    // Garante que cada item seja um objeto único para evitar problemas de reatividade no v-for
    indicators.value = data.map((item: Indicador) => ({ 
      id: item.indicadorId,
      nome: item.nome,
      oculto: item.oculto,
      descricao: item.descricao
      // formula: item.formula,
      // unidade: item.unidade
     }))

     // 1. Pré-selecionar indicadores onde 'oculto' é false
     const preSelecionados = indicators.value.filter(ind => ind.oculto === false);
     indicadoresSelecionados.value = preSelecionados.slice(0, 3); // Limita a 3, se houver mais

     // 2. Abrir o detalhe do primeiro indicador selecionado, se houver
     if (indicadoresSelecionados.value.length > 0) {
       detalheAberto.value = indicadoresSelecionados.value[0]!.id;
     }

     console.log('Indicadores carregados:', indicators.value);
     console.log('Indicadores pré-selecionados:', indicadoresSelecionados.value);
  } catch (error) {
    console.error('Erro ao carregar indicadores:', error)
  }
})

function estaSelecionado(indicator: Indicator): boolean {
  // A comparação deve ser estritamente pelo ID para evitar problemas de reatividade do Vue
  // quando objetos são compartilhados ou otimizados no v-for.
  return indicadoresSelecionados.value.some(ind => ind.id === indicator.id)
}

function toggleSelecao(indicator: Indicator) {
  const index = indicadoresSelecionados.value.findIndex(ind => ind.id === indicator.id)
  
  if (index !== -1) {
    removerSelecao(indicator)
  } else {
    if (indicadoresSelecionados.value.length < 3) {
      indicadoresSelecionados.value.push(indicator)
      detalheAberto.value = indicator.id
    }
  }
}

function removerSelecao(indicator: Indicator) {
  const index = indicadoresSelecionados.value.findIndex(ind => ind.id === indicator.id)
  if (index !== -1) {
    indicadoresSelecionados.value.splice(index, 1)
    if (detalheAberto.value === indicator.id) {
      detalheAberto.value = null
    }
  }
}

function toggleDetalhe(indicatorId: number) {
  // Simplesmente alterna entre o ID atual e null
  detalheAberto.value = detalheAberto.value === indicatorId ? null : indicatorId
}

function confirmarSelecao() {
  if (indicadoresSelecionados.value.length > 0) {
    emit('salvar', {
      indicadores: indicadoresSelecionados.value.map(ind => ({
        id: ind.id,
        nome: ind.nome,
        descricao: ind.descricao,
        // formula: ind.formula,
        // unidade: ind.unidade
      }))
    });
    fetchAtualizaSelecionados(indicadoresSelecionados.value.map(ind => ind.id));
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>