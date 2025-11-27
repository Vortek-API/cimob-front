<template>
  <div class="w-full px-4 py-6">
    <div class="max-w-[1400px] mx-auto">
      <!-- Título -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-2">Distritos de São José dos Campos</h1>
        <p class="text-base text-slate-600">Mapa Interativo - Clique nos distritos para mais informações</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mb-8">
        <!-- Coluna 1: Mapa Real -->
        <div class="w-full h-full">
          <div class="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-lg border border-slate-200 p-4 h-full flex items-center justify-center">
            <div class="relative w-full max-w-[450px]">
              <img
                src="/images/mapaSjc.png"
                alt="Mapa dos Distritos de São José dos Campos"
                class="w-full h-auto rounded-xl shadow-md"
              />
              
              <!-- Áreas clicáveis sobre o mapa -->
              <div class="absolute inset-0">
                <!-- Hotspot São José dos Campos -->
                <div
                  @click="selecionarDistrito('sjc')"
                  class="absolute cursor-pointer transition-all duration-300 hover:scale-110"
                  style="top: 45%; left: 30%; width: 35%; height: 40%;"
                  title="São José dos Campos"
                ></div>

                <!-- Hotspot São Francisco Xavier -->
                <div
                  @click="selecionarDistrito('sfx')"
                  class="absolute cursor-pointer transition-all duration-300 hover:scale-110"
                  style=" top: 10%;
                          left: 35%;
                          width: 20%;
                          height: 30%;"
                  title="São Francisco Xavier"
                ></div>

                <!-- Hotspot Eugênio de Melo -->
                <div
                  @click="selecionarDistrito('edm')"
                  class="absolute cursor-pointer transition-all duration-300 hover:scale-110"
                  style="top: 60%;
                        width: 10%;
                        height: 10%;
                        right: 15%;"
                  title="Eugênio de Melo"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Coluna 2: Informações do Distrito -->
        <div class="w-full h-full">
          <!-- Legenda Interativa -->
          <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 h-full flex flex-col justify-center">
            <h2 class="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-blue-600">Distritos</h2>
            
            <div 
              v-for="distrito in distritos" 
              :key="distrito.id"
              @click="selecionarDistrito(distrito.id)"
              class="flex items-center mb-3 p-3 rounded-lg transition-all duration-300 cursor-pointer border"
              :class="{ 
                'bg-blue-50 border-blue-600 shadow-sm': distritoAtivo === distrito.id,
                'bg-slate-50 border-transparent hover:bg-slate-100 hover:border-slate-300': distritoAtivo !== distrito.id
              }"
            >
              <div 
                class="w-8 h-8 rounded mr-3 shadow-sm border border-white flex-shrink-0"
                :style="{ background: distrito.cor }"
              ></div>
              <div class="flex-1">
                <div class="font-bold text-slate-800 text-sm">{{ distrito.nome }}</div>
              </div>
            </div>

            <!-- PAINEL INFO DISTRITO -->
            <div class="bg-slate-50 text-slate-800 p-4 rounded-xl shadow-inner mt-4 border border-slate-200 flex-grow">
              <h3 class="text-lg font-bold mb-2 pb-1 border-b border-slate-300">
                {{ distritoSelecionado.nome }}
              </h3>

              <p class="text-xs mb-4 text-slate-600 leading-relaxed">
                {{ distritoSelecionado.descricao }}
              </p>

              <div class="grid grid-cols-2 gap-3 mt-auto">
                <div class="bg-white p-2 rounded-lg text-center shadow-sm border border-slate-200">
                  <div class="text-[10px] text-slate-500 uppercase tracking-wide">População</div>
                  <div class="text-sm font-bold text-slate-800">{{ distritoSelecionado.populacao }}</div>
                </div>

                <div class="bg-white p-2 rounded-lg text-center shadow-sm border border-slate-200">
                  <div class="text-[10px] text-slate-500 uppercase tracking-wide">Área</div>
                  <div class="text-sm font-bold text-slate-800">{{ distritoSelecionado.area }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Seção de Indicadores e Controles -->
      <div class="w-full space-y-6">
        <!-- Controles (Filtro e Botão) -->
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div class="w-full md:w-auto flex-1">
            <MenuRegiao />
          </div>
          <button
            v-if="auth.isAdmin"
            @click="abrirModal"
            class="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Novo Indicador</span>
          </button>
        </div>

        <!-- Modal -->
        <ModalCriarIndicador
          v-if="isModalAberto"
          @fechar="fecharModal"
          @salvar="salvarNovoIndicador"
        />

        <!-- Componente Indicadores -->
        <div class="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
          <ComponenteIndicadores />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalCriarIndicador from "../components/ModalCriarIndicador.vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/store/authStore";
import MenuRegiao from "~/components/MenuRegiao.vue";
import ComponenteIndicadores from "~/components/ComponenteIndicadores.vue";

type DistritoId = 'sjc' | 'sfx' | 'edm';

interface DistritoInfo {
  nome: string;
  descricao: string;
  populacao: string;
  area: string;
  caracteristicas: string;
}

const isModalAberto = ref(false);
const distritoAtivo = ref<DistritoId>('sjc');

const distritos: Array<{ id: DistritoId; nome: string; info: string; cor: string }> = [
  {
    id: 'sjc',
    nome: 'São José dos Campos',
    info: 'Distrito Central',
    cor: '#8B9FFF'
  },
  {
    id: 'sfx',
    nome: 'São Francisco Xavier',
    info: 'Distrito Norte',
    cor: '#FF9F6B'
  },
  {
    id: 'edm',
    nome: 'Eugênio de Melo',
    info: 'Distrito Leste',
    cor: '#2C7A7B'
  }
];

const dadosDistritos: Record<DistritoId, DistritoInfo> = {
  sjc: {
    nome: 'São José dos Campos',
    descricao: 'Distrito central e sede do município, concentra a maior parte da população e atividades econômicas.',
    populacao: '≈ 700.000 hab.',
    area: '≈ 353 km²',
    caracteristicas: 'Centro administrativo, comercial e industrial'
  },
  sfx: {
    nome: 'São Francisco Xavier',
    descricao: 'Distrito rural localizado na região norte, conhecido por seu turismo ecológico e clima serrano.',
    populacao: '≈ 5.000 hab.',
    area: '≈ 410 km²',
    caracteristicas: 'Turismo rural, ecoturismo, clima de montanha'
  },
  edm: {
    nome: 'Eugênio de Melo',
    descricao: 'Distrito industrial localizado a leste, importante polo de desenvolvimento econômico.',
    populacao: '≈ 25.000 hab.',
    area: '≈ 337 km²',
    caracteristicas: 'Distrito industrial, zona de expansão urbana'
  }
};

const distritoSelecionado = computed((): DistritoInfo => {
  return dadosDistritos[distritoAtivo.value];
});

function selecionarDistrito(id: DistritoId) {
  distritoAtivo.value = id;
}

function abrirModal() {
  isModalAberto.value = true;
}

function fecharModal() {
  isModalAberto.value = false;
}

  function salvarNovoIndicador(dadosDoFormulario: any) {
    console.log("Salvando os Dados: ", dadosDoFormulario);
    // futuramente eu posso chamar uma API para criar o indicador
    fecharModal();
  }

const auth = useAuthStore();
const router = useRouter();

onMounted(() => {
  if (!auth.isAuthenticated) {
    router.push("/");
  }
});
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
