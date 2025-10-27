<template>
  <div class="flex h-screen w-full bg-gray-50">
    <!-- Sidebar (importado) -->
    <Sidebar />
    
    <div class="flex-1 overflow-auto">
      <div class="p-6 md:p-8 w-full">
        <!-- HEADER COM TÍTULO -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Logs de Atividades do Indicador</h1>
          <p class="text-gray-600">Monitore e acompanhe todas as atividades do Indicador</p>
        </div>

        <!-- CARD DE ESTATÍSTICAS -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-4">
              <div class="bg-blue-100 p-3 rounded-lg">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-gray-600 text-sm font-medium">Total de Registros</p>
                <p class="text-3xl font-bold text-gray-900">{{ totalLogs }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-4">
              <div class="bg-green-100 p-3 rounded-lg">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-gray-600 text-sm font-medium">Logs do Indicador</p>
                <p class="text-3xl font-bold text-gray-900">{{ logsDoIndicador }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-4">
              <div class="bg-cyan-100 p-3 rounded-lg">
                <svg class="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-gray-600 text-sm font-medium">Logs de Usuário</p>
                <p class="text-3xl font-bold text-gray-900">{{ logsDeUsuario }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-4">
              <div class="bg-amber-100 p-3 rounded-lg">
                <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-gray-600 text-sm font-medium">Logs Eventos</p>
                <p class="text-3xl font-bold text-gray-900">{{ logsEventos }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- SEÇÃO DE FILTROS -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Filtrar Logs</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Buscar por Usuário ou Indicador</label>
              <input 
                type="text" 
                placeholder="Digite aqui..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Indicador</label>
              <select 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="">Todos os Indicadores</option>
                <option value="usuario">Usuário</option>
                <option value="Indicador">Indicador</option>
                <option value="Eventos">Eventos</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Data Inicial</label>
              <input 
                type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Data Final</label>
              <input 
                type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div class="flex items-end">
              <button 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>

        <!-- TABELA DE LOGS -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Usuário</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tipo</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Descrição</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Data</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ação</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="log in logs" :key="log.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 text-sm text-gray-900">{{ log.usuario }}</td>
                  <td class="px-6 py-4">
                    <span :class="['px-3 py-1 rounded-full text-xs font-semibold text-white', getIndicadorColor(log.indicador)]">
                      {{ log.indicador }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-700">{{ log.descricao }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600">{{ formatDate(log.data) }}</td>
                  <td class="px-6 py-4">
                    <button 
                      @click="viewDetails(log)"
                      class="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm flex items-center gap-1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mensagem quando não há logs -->
          <div v-if="logs.length === 0" class="text-center py-12">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p class="text-gray-500 text-lg">Nenhum log encontrado</p>
            <p class="text-gray-400 text-sm">Tente ajustar os filtros ou verifique o período selecionado</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Log {
  id: number
  usuario: string
  indicador: 'Usuário' | 'Indicador' | 'Eventos'
  descricao: string
  data: Date
  acao: string
}

const logs = ref<Log[]>([
  { id: 1, usuario: 'joao.silva', indicador: 'Usuário', descricao: 'Tentativa de login falha.', data: new Date('2025-10-23T10:00:00'), acao: 'Login' },
  { id: 2, usuario: 'maria.oliveria', indicador: 'Indicador', descricao: 'Backup diário concluído com sucesso.', data: new Date('2025-10-23T03:00:00'), acao: 'Backup' },
  { id: 3, usuario: 'pedro.santos', indicador: 'Eventos', descricao: 'Fatura #2025001 gerada.', data: new Date('2025-10-22T15:30:00'), acao: 'Geração de Fatura' },
  { id: 4, usuario: 'joao.silva', indicador: 'Usuário', descricao: 'Alteração de permissão do usuário X.', data: new Date('2025-10-22T10:00:00'), acao: 'Alteração' },
  { id: 5, usuario: 'Indicador', indicador: 'Indicador', descricao: 'Atualização de biblioteca de segurança.', data: new Date('2025-10-21T02:00:00'), acao: 'Atualização' },
])

// Propriedades computadas para estatísticas
const totalLogs = computed(() => logs.value.length)

const logsDoIndicador = computed(() => 
  logs.value.filter(l => l.indicador === 'Indicador').length
)

const logsDeUsuario = computed(() => 
  logs.value.filter(l => l.indicador === 'Usuário').length
)

const logsEventos = computed(() => 
  logs.value.filter(l => l.indicador === 'Eventos').length
)

const formatDate = (date: Date): string => {
  return date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}

const getIndicadorColor = (indicador: string): string => {
  switch (indicador.toLowerCase()) {
    case 'usuário':
      return 'bg-cyan-600'
    case 'indicador':
      return 'bg-green-600'
    case 'eventos':
      return 'bg-amber-600'
    default:
      return 'bg-gray-600'
  }
}

const viewDetails = (log: Log) => {
  alert(`Detalhes do Log ID ${log.id}:\nUsuário: ${log.usuario}\nDescrição: ${log.descricao}\nData: ${formatDate(log.data)}`)
}
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
