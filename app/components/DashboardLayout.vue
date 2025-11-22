<template>
  <div class="flex bg-gray-100">
    <main class="flex-1 bg-gray-100 p-6">
      <div class="max-w-6xl mx-auto">
        <div
          class="grid grid-cols-1 md:grid-cols-[320px_1fr] lg:grid-cols-[320px_1fr] xl:grid-cols-[320px_1fr] gap-8 items-start"
        >
          <!-- Coluna 1: Mapa (320px) -->
          <div class="w-full md:-mt-2">
            <div class="aspect-[3/4] w-full overflow-hidden">
              <img
                src="/images/mapaSjc.png"
                alt="Mapa SJC"
                class="w-full h-full object-contain object-left -ml-4 md:-ml-6"
                decoding="async"
              />
            </div>
          </div>

          <!-- Coluna 2: Controles e Indicadores (1fr) -->
          <div class="w-full max-w-[860px]">
            <!-- Controles (MenuRegiao e botão Selecionar Indicador) -->
            <div class="flex items-center justify-between mb-6 md:mb-8">
              <MenuRegiao />
              <button
                v-if="auth.isAdmin"
                @click="abrirModal"
                class="ml-auto bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Selecionar Indicador
              </button>
              <div class="flex items-center gap-4 mb-4"></div>
            </div>
            
            <!-- Modal deve estar fora do flex de controles, mas dentro da Coluna 2 -->
            <ModalCriarIndicador
              v-if="isModalAberto"
              @fechar="fecharModal"
              @salvar="salvarNovoIndicador"
            />
            
            <!-- ComponenteIndicadores movido para a Coluna 2, abaixo dos controles/modal -->
            <ComponenteIndicadores />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import ModalCriarIndicador from "../components/ModalCriarIndicador.vue";
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "~/store/authStore";
  import MenuRegiao from "~/components/MenuRegiao.vue";
  import ComponenteIndicadores from "~/components/ComponenteIndicadores.vue";
  import Sidebar from "~/components/Sidebar.vue"; // Mantido para consistência, embora não usado no template

  const isModalAberto = ref(false);

  function abrirModal() {
    isModalAberto.value = true;
  }
  function fecharModal() {
    isModalAberto.value = false;
  }

  function salvarNovoIndicador(dadosDoFormulario: any) {
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