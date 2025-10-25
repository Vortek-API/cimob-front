<script setup lang="ts">
import { computed } from 'vue'
import { useIndicesCriticosAutoRefresh } from '~/composables/useIndicesCriticosAutoRefresh'

const props = withDefaults(defineProps<{ maxHeight?: string; limit?: number }>(), {
  limit: 3
})

type Linha = {
  endereco: string
  regiao: string
  intervalo: string
  velocidadePermitida: number
  velocidadeRegistrada: number
}

const { rows, isLoading, errorMsg } = useIndicesCriticosAutoRefresh()

// Função para calcular a diferença de velocidade
const calcularDiferenca = (permitida: number, registrada: number): number => {
  return registrada - permitida
}

// Função para determinar a cor baseada na diferença
const getVelocidadeColor = (permitida: number, registrada: number): string => {
  const diferenca = calcularDiferenca(permitida, registrada)
  if (diferenca <= 0) return 'bg-green-50 text-green-900' // Dentro do limite
  if (diferenca <= 10) return 'bg-yellow-50 text-yellow-900' // Leve excesso
  if (diferenca <= 20) return 'bg-orange-50 text-orange-900' // Moderado
  return 'bg-red-50 text-red-900' // Crítico
}

// Função para determinar o ícone baseado na diferença
const getVelocidadeIcon = (permitida: number, registrada: number): string => {
  const diferenca = calcularDiferenca(permitida, registrada)
  if (diferenca <= 0) return 'i-lucide-check-circle' // OK
  if (diferenca <= 10) return 'i-lucide-alert-circle' // Aviso
  if (diferenca <= 20) return 'i-lucide-alert-triangle' // Atenção
  return 'i-lucide-alert-octagon' // Crítico
}

const columns = [
  { accessorKey: 'endereco', header: 'Endereço do Radar', width: '25%' },
  { accessorKey: 'regiao', header: 'Região', width: '15%' },
  { accessorKey: 'intervalo', header: 'Intervalo', width: '15%' },
  { accessorKey: 'velocidadePermitida', header: 'Vel. Permitida (km/h)', width: '15%' },
  { accessorKey: 'velocidadeRegistrada', header: 'Vel. Registrada (km/h)', width: '15%' },
  { accessorKey: 'diferenca', header: 'Diferença', width: '15%' }
]

const tableUi = {
  root: 'w-full',
  base: 'w-full table-auto',
  thead: 'bg-gradient-to-r from-blue-50 to-blue-100',
  tbody: 'bg-white divide-y divide-gray-200',
  th: 'sticky top-0 z-10 bg-gradient-to-r from-blue-50 to-blue-100 text-sm font-semibold text-gray-900 px-4 py-3 text-left border-b-2 border-blue-200',
  td: 'px-4 py-3 text-gray-800',
  tr: 'hover:bg-blue-50 transition-colors duration-150'
}

const visibleData = computed(() => 
  rows.value.slice(0, props.limit).map(row => ({
    ...row,
    diferenca: calcularDiferenca(row.velocidadePermitida, row.velocidadeRegistrada)
  }))
)
</script>

<template>
  <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden" :style="props.maxHeight ? { maxHeight: props.maxHeight, overflowY: 'auto' } : undefined">
    <!-- ESTADO DE CARREGAMENTO -->
    <div v-if="isLoading" class="p-6">
      <div class="flex items-center gap-3 mb-4">
        <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <span class="text-sm font-medium text-gray-700">Carregando índices críticos...</span>
      </div>
      
      <!-- Skeleton Loader -->
      <div class="space-y-3">
        <div v-for="i in props.limit" :key="`skeleton-${i}`" class="space-y-2">
          <div class="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- ESTADO DE ERRO -->
    <div v-else-if="errorMsg" class="p-6">
      <div class="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
        <svg class="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <p class="text-sm font-medium text-red-900">Erro ao carregar dados</p>
          <p class="text-sm text-red-700 mt-1">{{ errorMsg }}</p>
        </div>
      </div>
    </div>

    <!-- TABELA DE DADOS -->
    <div v-else>
      <div v-if="visibleData.length === 0" class="p-6 text-center">
        <svg class="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p class="text-gray-500 text-sm">Nenhum índice crítico encontrado</p>
      </div>

      <table v-else class="w-full">
        <thead>
          <tr class="bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-200">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900">Endereço do Radar</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900">Região</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900">Intervalo</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-900">Vel. Permitida</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-900">Vel. Registrada</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-gray-900">Diferença</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(row, idx) in visibleData" :key="`row-${idx}`" class="hover:bg-blue-50 transition-colors duration-150">
            <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ row.endereco }}</td>
            <td class="px-4 py-3 text-sm text-gray-700">{{ row.regiao }}</td>
            <td class="px-4 py-3 text-sm text-gray-700">{{ row.intervalo }}</td>
            
            <!-- Velocidade Permitida -->
            <td class="px-4 py-3 text-center">
              <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-50 text-green-900 text-sm font-medium">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ row.velocidadePermitida }}
              </span>
            </td>

            <!-- Velocidade Registrada com Destaque -->
            <td class="px-4 py-3 text-center">
              <span :class="['inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium', getVelocidadeColor(row.velocidadePermitida, row.velocidadeRegistrada)]">
                <svg :class="['h-4 w-4', getVelocidadeIcon(row.velocidadePermitida, row.velocidadeRegistrada)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ row.velocidadeRegistrada }}
              </span>
            </td>

            <!-- Diferença de Velocidade -->
            <td class="px-4 py-3 text-center">
              <span :class="['inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold', getVelocidadeColor(row.velocidadePermitida, row.velocidadeRegistrada)]">
                +{{ row.diferenca }} km/h
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Animação suave para o skeleton loader */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-pulse {
  animation: shimmer 2s infinite;
}
</style>
