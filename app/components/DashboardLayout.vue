<template>
  <div class="w-full px-4 py-8">
    <div class="max-w-[1600px] mx-auto">
      <!-- Título -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-slate-800 mb-3">Distritos de São José dos Campos</h1>
        <p class="text-xl text-slate-600">Mapa Interativo - Clique nos distritos para mais informações</p>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-[1fr_450px] gap-12 items-start mb-12">
        <!-- Coluna 1: Mapa Real -->
        <div class="w-full">
          <div class="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl shadow-xl border border-slate-200 p-10">
            <div class="relative max-w-[800px] mx-auto">
              <img
                src="/images/mapaSjc.png"
                
                alt="Mapa dos Distritos de São José dos Campos"
                class="w-full h-auto rounded-2xl shadow-lg"
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
                  style="top: 15%; left: 35%; width: 40%; height: 30%;"
                  title="São Francisco Xavier"
                ></div>

                <!-- Hotspot Eugênio de Melo -->
                <div
                  @click="selecionarDistrito('edm')"
                  class="absolute cursor-pointer transition-all duration-300 hover:scale-110"
                  style="top: 35%; right: 15%; width: 25%; height: 35%;"
                  title="Eugênio de Melo"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Coluna 2: Controles, Legenda e Indicadores -->
        <div class="w-full space-y-8">
          <!-- Controles -->
          <div class="flex flex-col gap-4">
            <div class="w-full">
              <MenuRegiao />
            </div>
            <button
              v-if="auth.isAdmin"
              @click="abrirModal"
              class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
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

          <!-- Legenda Interativa -->
          <div class="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
            <h2 class="text-3xl font-bold text-slate-800 mb-6 pb-4 border-b-4 border-blue-600">Distritos</h2>
            
            <div 
              v-for="distrito in distritos" 
              :key="distrito.id"
              @click="selecionarDistrito(distrito.id)"
              class="flex items-center mb-4 p-5 rounded-2xl transition-all duration-300 cursor-pointer border-3"
              :class="{ 
                'bg-blue-50 border-blue-600 shadow-md': distritoAtivo === distrito.id,
                'bg-slate-50 border-transparent hover:bg-slate-100 hover:border-slate-300': distritoAtivo !== distrito.id
              }"
              style="border-width: 3px;"
            >
              <div 
                class="w-12 h-12 rounded-xl mr-5 shadow-md border-3 border-white flex-shrink-0"
                :style="{ background: distrito.cor }"
              ></div>
              <div class="flex-1">
                <div class="font-bold text-slate-800 text-lg">{{ distrito.nome }}</div>
                <div class="text-sm text-slate-600">{{ distrito.info }}</div>
              </div>
            </div>

                   <!-- PAINEL INFO DISTRITO (novo estilo neutro) -->
            <div class="bg-slate-100 text-slate-800 p-6 rounded-2xl shadow-inner mt-8 border border-slate-300">
              <h3 class="text-2xl font-bold mb-3 pb-2 border-b border-slate-300">
                {{ distritoSelecionado.nome }}
              </h3>

              <p class="text-base mb-6 text-slate-700">
                {{ distritoSelecionado.descricao }}
              </p>

              <div class="grid grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-xl text-center shadow border border-slate-200">
                  <div class="text-sm text-slate-500">População</div>
                  <div class="text-2xl font-bold">{{ distritoSelecionado.populacao }}</div>
                </div>

                <div class="bg-white p-4 rounded-xl text-center shadow border border-slate-200">
                  <div class="text-sm text-slate-500">Área</div>
                  <div class="text-2xl font-bold">{{ distritoSelecionado.area }}</div>
                </div>
              </div>

              <div class="mt-5 pt-4 border-t border-slate-300 text-sm">
                <span class="font-semibold text-slate-700">Características:</span>
                <p class="text-base mt-1">{{ distritoSelecionado.caracteristicas }}</p>
              </div>
            </div>
          </div>
          

        </div>
      </div>
      
      <!-- Componente Indicadores em largura total -->
      <div class="w-full">
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
