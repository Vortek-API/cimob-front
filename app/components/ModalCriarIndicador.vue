<template>
  <div 
    @click="$emit('fechar')" 
    class="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
  >
    <div @click.stop class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mx-4"> <h2 class="text-2xl font-bold text-blue-900 mb-2">Criar Novo Indicador</h2>
      <p class="text-gray-600 mb-6">Selecione o tipo de visualização para o seu novo indicador.</p>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div
          v-for="tipo in tiposDeIndicador"
          :key="tipo.id"
          @click="tipoSelecionado = tipo.id"
          :class="[
            'border-2 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-200',
            tipoSelecionado === tipo.id ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mb-2 text-gray-600" v-html="tipo.svg"></svg>
          <span class="font-semibold text-gray-700">{{ tipo.nome }}</span>
        </div>
      </div>

      <form @submit.prevent="submeterFormulario">
        <div class="space-y-4">
          <div>
            <label for="nome" class="block text-sm font-medium text-gray-700">Nome do Indicador</label>
            <input v-model="form.nome" type="text" id="nome" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label for="descricao" class="block text-sm font-medium text-gray-700">Descrição (Opcional)</label>
            <textarea v-model="form.descricao" id="descricao" rows="2" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
        </div>

        <div class="mt-8 flex justify-end gap-4">
          <button type="button" @click="$emit('fechar')" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg">
            Cancelar
          </button>
          <button type="submit" class="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg">
            Salvar Indicador
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

// Em app/components/ModalCriarIndicador.vue
<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['fechar', 'salvar'])

// NOVO: Lista de tipos de indicadores com ícones SVG
const tiposDeIndicador = [
  { id: 'pizza', nome: 'Gráfico de Pizza', svg: `<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />` },
  { id: 'colunas', nome: 'Colunas', svg: `<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />` },
  { id: 'cascata', nome: 'Cascata', svg: `<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25.75.75 2.25-2.25m4.5 4.5.75.75 2.25-2.25m-7.5 6  .75.75 2.25-2.25m4.5 5.25.75.75 2.25-2.25m-7.5 2.25h9m-9 3.75h9m-9 3.75h9" />`},
  { id: 'tabela', nome: 'Tabela', svg: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5V4.125c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v14.25A1.125 1.125 0 0 1 18.75 19.5M3.375 9.75h17.25" />` },
]

// NOVO: Estado para guardar qual tipo foi selecionado
const tipoSelecionado = ref<string | null>(null)

// MODIFICADO: O formulário agora também terá o tipo
const form = ref({
  nome: '',
  descricao: ''
})

function submeterFormulario() {
  if (!tipoSelecionado.value) {
    alert('Por favor, selecione um tipo de indicador.');
    return;
  }
  if (!form.value.nome.trim()) {
    alert('O nome do indicador é obrigatório!');
    return;
  }

  // Emite um objeto completo com os dados do formulário e o tipo selecionado
  emit('salvar', {
    ...form.value,
    tipo: tipoSelecionado.value
  })
}
</script>