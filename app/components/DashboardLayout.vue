<template>
  <main class="flex-1 bg-gray-100 p-6">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-[320px_1fr] lg:grid-cols-[320px_1fr] xl:grid-cols-[320px_1fr] gap-8 items-start">
        <div class="w-full md:-mt-2">
          <div class="aspect-[3/4] w-full overflow-hidden">
            <img src="/images/mapaSjc.png" alt="Mapa SJC" class="w-full h-full object-contain object-left -ml-4 md:-ml-6" decoding="async" />
          </div>
        </div>

        <div class="w-full max-w-[860px]">
          <div class="flex items-center justify-between mb-6 md:mb-8">

            <SeletorDataInicial />
  <MenuRegiao />
  <button
    @click="abrirModal"
    class="ml-auto bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
  >
    Criar Indicador
  </button>
          <div class="flex items-center gap-4 mb-4">
                  </div>
              
              <ModalCriarIndicador 
                v-if="isModalAberto" 
                @fechar="fecharModal"
                @salvar="salvarNovoIndicador"
              />
            </div>
           </div>
          <ComponenteIndicadores />
        </div>
      </div>
  </main>
</template>

<script setup lang="ts">
import ModalCriarIndicador from '../components/ModalCriarIndicador.vue' 

const isModalAberto = ref(false)

function abrirModal() {
  isModalAberto.value = true
}
function fecharModal() {
  isModalAberto.value = false
}

function salvarNovoIndicador(dadosDoFormulario: any) {
  console.log('Salvando os Dados: ', dadosDoFormulario);
    // futuramente eu posso chamar uma API para criar o indicador
  fecharModal();
}
</script>
<style scoped>
</style>
