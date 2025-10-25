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
            :key="indicator.name"
            @click="toggleSelecao(indicator)"
            :class="[
              'border-2 rounded-xl p-4 cursor-pointer transition-all duration-300',
              estaSeleccionado(indicator) 
                ? 'border-blue-500 bg-blue-50 shadow-lg' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            ]"
            :style="{ opacity: !estaSeleccionado(indicator) && indicadoresSelecionados.length >= 3 ? 0.5 : 1, pointerEvents: !estaSeleccionado(indicator) && indicadoresSelecionados.length >= 3 ? 'none' : 'auto' }"
          >
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 mt-1">
                <div :class="[
                  'w-5 h-5 border-2 rounded flex items-center justify-center',
                  estaSeleccionado(indicator) ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                ]">
                  <svg v-if="estaSeleccionado(indicator)" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-gray-800">{{ indicator.name }}</h3>
                <p class="text-sm text-gray-600 mt-1 line-clamp-2">{{ indicator.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
          <h3 class="text-xl font-bold text-blue-900 mb-4">Detalhes Selecionados</h3>
          
          <div v-if="indicadoresSelecionados.length > 0" class="space-y-3">
            <div 
              v-for="(indicator, index) in indicadoresSelecionados" 
              :key="indicator.name" 
              class="bg-white p-4 rounded-lg border border-blue-200"
            >
              <!-- CABEÇALHO DO ACORDEÃO -->
              <div class="flex items-start justify-between mb-3 cursor-pointer" @click="toggleDetalhe(indicator.name)">
                <h4 class="font-bold text-gray-800 flex-1">{{ index + 1 }}. {{ indicator.name }}</h4>
                <div class="flex items-center space-x-3">
                  <!-- Ícone de Expansão/Contração -->
                  <svg 
                    :class="['w-5 h-5 text-blue-600 transition-transform', { 'rotate-180': detalheAberto === indicator.name }]"
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
              <div v-if="detalheAberto === indicator.name" class="pt-3 border-t border-gray-100 mt-3 space-y-3 text-sm">
                <div>
                  <label class="font-semibold text-gray-700">Descrição</label>
                  <p class="text-gray-800 mt-1">{{ indicator.description }}</p>
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
import { ref } from 'vue'

const emit = defineEmits(['fechar', 'salvar'])

interface Indicator {
  name: string;
  description: string;
  formula: string;
  unidade: string;
}

const indicators = ref<Indicator[]>([
  {
    name: "Velocidade Média de Resolução (VMR)",
    description: "Mede o tempo médio que a equipe leva para resolver uma solicitação ou incidente, desde o momento da abertura até o fechamento. É um indicador crucial de eficiência operacional e satisfação do cliente.",
    formula: "Tempo Total de Resolução / Número de Solicitações Resolvidas",
    unidade: "Horas/Minutos"
  },
  {
    name: "Taxa de Conversão de Leads (TCL)",
    description: "Percentual de leads que avançam para a próxima etapa do funil de vendas ou se tornam clientes. Essencial para avaliar a eficácia das estratégias de marketing e vendas.",
    formula: "(Leads Convertidos / Total de Leads) × 100",
    unidade: "%"
  },
  {
    name: "Índice de Satisfação do Cliente (CSAT)",
    description: "Avalia o grau de contentamento dos clientes com um produto, serviço ou interação específica. Coletado tipicamente por meio de pesquisas rápidas após o serviço.",
    formula: "(Soma das Respostas Satisfatórias / Total de Respostas) × 100",
    unidade: "Pontos/Porcentagem"
  },
  {
    name: "Churn Rate Mensal",
    description: "A taxa de cancelamento de clientes em um período. Um indicador vital para a saúde de negócios baseados em assinatura.",
    formula: "(Clientes Perdidos no Mês / Clientes no Início do Mês) × 100",
    unidade: "%"
  },
  {
    name: "Custo de Aquisição de Cliente (CAC)",
    description: "O valor total gasto em marketing e vendas para adquirir um novo cliente.",
    formula: "Investimento em Marketing e Vendas / Número de Clientes Adquiridos",
    unidade: "R$ ou Moeda Local"
  },
  {
    name: "Valor do Tempo de Vida do Cliente (LTV)",
    description: "A receita total que um cliente deve gerar durante todo o seu relacionamento com a empresa.",
    formula: "Valor Médio de Compra × Frequência de Compra × Tempo de Vida do Cliente",
    unidade: "R$ ou Moeda Local"
  },
])

const indicadoresSelecionados = ref<Indicator[]>([])

// Estado para controlar qual detalhe de indicador está aberto (usa o nome do indicador como chave)
const detalheAberto = ref<string | null>(null)

// Função para verificar se um indicador está selecionado
function estaSeleccionado(indicator: Indicator): boolean {
  return indicadoresSelecionados.value.some(ind => ind.name === indicator.name)
}

function toggleSelecao(indicator: Indicator) {
  if (estaSeleccionado(indicator)) {
    removerSelecao(indicator)
  } else {
    if (indicadoresSelecionados.value.length < 3) {
      indicadoresSelecionados.value.push(indicator)
    }
  }
}

function removerSelecao(indicator: Indicator) {
  indicadoresSelecionados.value = indicadoresSelecionados.value.filter(
    ind => ind.name !== indicator.name
  )
  if (detalheAberto.value === indicator.name) {
    detalheAberto.value = null
  }
}

function toggleDetalhe(indicatorName: string) {
  if (detalheAberto.value === indicatorName) {
    detalheAberto.value = null 
  } else {
    detalheAberto.value = indicatorName 
  }
}

function confirmarSelecao() {
  if (indicadoresSelecionados.value.length > 0) {
    emit('salvar', {
      indicadores: indicadoresSelecionados.value.map(ind => ({
        nome: ind.name,
        descricao: ind.description,
        formula: ind.formula,
        unidade: ind.unidade
      }))
    })
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
