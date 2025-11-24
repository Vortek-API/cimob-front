<template>
  <div class="flex h-screen w-full bg-gray-50">
    <Sidebar />
    
    <div class="flex-1 overflow-auto">
      <div class="p-6 md:p-8 w-full">
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Logs de Atividades do Indicador</h1>
          <p class="text-gray-600">Monitore e acompanhe todas as atividades do Indicador</p>
        </div>

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

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Filtrar Logs</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Buscar por Usuário ou Indicador</label>
              <input 
                type="text" 
                placeholder="Digite aqui..."
                v-model="filterSearch"
                @keyup.enter="applyFilters"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Indicador</label>
              <select 
                v-model="filterTipo"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="">Todos os Indicadores</option>
                <option value="USUARIO">Usuário</option>
                <option value="INDICADOR">Indicador</option>
                <option value="EVENTOS">Eventos</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Data Inicial</label>
              <input 
                type="date"
                v-model="filterDataInicial"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Data Final</label>
              <input 
                type="date"
                v-model="filterDataFinal"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div class="flex items-end">
              <button 
                @click="clearFilters"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>

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
                <tr v-for="log in logsPaginados" :key="log.timelineId" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 text-sm text-gray-900">{{ log.emailUsuario }}</td>
                  <td class="px-6 py-4">
                    <span :class="[
                      'px-3 py-1 rounded-full text-xs font-semibold text-white',
                      getIndicadorColor(log.tipo),
                    ]">
                      {{ log.tipo }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-700">{{ log.descricao }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600">{{ formatDate(log.data) }}</td>
                  <td class="px-6 py-4">
                    {{ log.acao }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="logsFiltrados.length === 0" class="text-center py-12">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p class="text-gray-500 text-lg">Nenhum log encontrado</p>
            <p class="text-gray-400 text-sm">Tente ajustar os filtros ou verifique o período selecionado</p>
          </div>

          <!-- CONTROLES DE PAGINAÇÃO -->
          <div v-if="totalPages > 1" class="flex justify-between items-center p-4 border-t border-gray-200">
            <p class="text-sm text-gray-700">
              Mostrando 
              <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> 
              a 
              <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, logsFiltrados.length) }}</span> 
              de 
              <span class="font-medium">{{ logsFiltrados.length }}</span> 
              resultados
            </p>
            <div class="flex space-x-1">
              <button 
                @click="changePage(currentPage - 1)" 
                :disabled="currentPage === 1"
                :class="[
                  'px-3 py-1 text-sm font-medium rounded-lg transition-colors',
                  currentPage === 1 ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                ]"
              >
                Anterior
              </button>
              
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="changePage(page)"
                :class="[
                  'px-3 py-1 text-sm font-medium rounded-lg transition-colors',
                  page === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                ]"
              >
                {{ page }}
              </button>

              <button 
                @click="changePage(currentPage + 1)" 
                :disabled="currentPage === totalPages"
                :class="[
                  'px-3 py-1 text-sm font-medium rounded-lg transition-colors',
                  currentPage === totalPages ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                ]"
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { fetchLogs } from '~/services/timeline-api';
import { type Timeline, TimelineTipo } from '~/types/timeline';

const allLogs = ref<Timeline[]>([]);

const filterSearch = ref('');
const filterTipo = ref('');
const filterDataInicial = ref('');
const filterDataFinal = ref('');

const currentPage = ref(1);
const itemsPerPage = ref(10); 

const loadLogs = async () => {
  allLogs.value = await fetchLogs();
};

loadLogs();

const applyFilters = () => {
  currentPage.value = 1;
};

const clearFilters = () => {
  filterSearch.value = '';
  filterTipo.value = '';
  filterDataInicial.value = '';
  filterDataFinal.value = '';
  currentPage.value = 1;
};

const logsFiltrados = computed(() => {
  let filtered = [...allLogs.value];

  if (filterSearch.value) {
    const searchLower = filterSearch.value.toLowerCase();
    filtered = filtered.filter(log => 
      log.emailUsuario.toLowerCase().includes(searchLower) ||
      log.descricao.toLowerCase().includes(searchLower)
    );
  }

  if (filterTipo.value) {
    filtered = filtered.filter(log => log.tipo === filterTipo.value);
  }

  if (filterDataInicial.value) {
    const start = new Date(filterDataInicial.value);
    start.setHours(0, 0, 0, 0);
    const startTimestamp = start.getTime();
    
    filtered = filtered.filter(log => {
      const logDate = createLocalTimeDate(log.data);
      return logDate.getTime() >= startTimestamp;
    });
  }

  if (filterDataFinal.value) {
    const end = new Date(filterDataFinal.value);
    end.setHours(23, 59, 59, 999); 
    const endTimestamp = end.getTime();
    
    filtered = filtered.filter(log => {
      const logDate = createLocalTimeDate(log.data);
      return logDate.getTime() <= endTimestamp;
    });
  }

  return filtered.sort((a, b) => createLocalTimeDate(b.data).getTime() - createLocalTimeDate(a.data).getTime());
});

const createLocalTimeDate = (isoString: string): Date => {
  const dateString = isoString.replace('T', ' ');
  return new Date(dateString);
};


const totalPages = computed(() => {
  return Math.ceil(logsFiltrados.value.length / itemsPerPage.value);
});

const logsPaginados = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return logsFiltrados.value.slice(start, end);
});

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

watch(logsFiltrados, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1;
  }
});


const totalLogs = computed(() => allLogs.value.length);

const logsDoIndicador = computed(() =>
  allLogs.value.filter(l => l.tipo === TimelineTipo.INDICADOR).length
);

const logsDeUsuario = computed(() =>
  allLogs.value.filter(l => l.tipo === TimelineTipo.USUARIO).length
);

const logsEventos = computed(() =>
  allLogs.value.filter(l => l.tipo === TimelineTipo.EVENTO).length
);


const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

const getIndicadorColor = (tipo: TimelineTipo): string => {
  switch (tipo) {
    case TimelineTipo.USUARIO:
      return 'bg-cyan-600';
    case TimelineTipo.INDICADOR:
      return 'bg-green-600';
    case TimelineTipo.EVENTO:
      return 'bg-amber-600';
    default:
      return 'bg-gray-600';
  }
};

const viewDetails = (log: Timeline) => {
  alert(
    `Log ID ${log.timelineId}\nUsuário: ${log.emailUsuario}\nDescrição: ${log.descricao}\nAção: ${log.acao}\nData: ${formatDate(log.data)}`
  );
};
</script>

<style scoped>
</style>