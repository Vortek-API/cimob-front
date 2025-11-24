<template>
  <div class="w-full">
    <!-- Título -->
    <div class="flex items-center gap-3 mb-8">
      <div class="w-1 h-6 bg-gradient-to-b from-orange-600 to-orange-400 rounded-full"></div>
      <h2 class="text-2xl font-bold text-gray-900">Novo Evento</h2>
    </div>

    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Nome do Evento -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Nome do Evento <span class="text-red-600">*</span>
        </label>
        <input
          v-model="formData.nome"
          type="text"
          placeholder="Ex: Congestionamento na Avenida Principal"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white hover:border-gray-400"
          required
        />
      </div>

      <!-- Data e Hora de Início -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Data e Hora de Início <span class="text-red-600">*</span>
        </label>
        <input
          v-model="formData.dataInicio"
          type="datetime-local"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white hover:border-gray-400"
          required
        />
      </div>

      <!-- Data e Hora de Fim -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Data e Hora de Fim <span class="text-red-600">*</span>
        </label>
        <input
          v-model="formData.dataFim"
          type="datetime-local"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white hover:border-gray-400"
          required
        />
        <p v-if="erroData" class="text-xs text-red-600 mt-2">
          A data de fim não pode ser anterior à data de início.
        </p>
      </div>

      <!-- Descrição -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Descrição <span class="text-red-600">*</span>
        </label>
        <textarea
          v-model="formData.descricao"
          placeholder="Descreva o evento com detalhes relevantes..."
          rows="4"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none bg-white hover:border-gray-400"
          required
        ></textarea>
      </div>

      <!-- Regiões -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Regiões Afetadas <span class="text-red-600">*</span>
        </label>
        <div
          class="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-50 hover:border-gray-400 transition-colors"
        >
          <div v-if="regioes.length === 0" class="text-sm text-gray-500 py-4 text-center">
            Carregando regiões...
          </div>

          <label
            v-for="regiao in regioes"
            :key="regiao.regiaoId"
            class="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded transition-colors"
          >
            <input
              :value="regiao.regiaoId"
              v-model="formData.regioesIds"
              type="checkbox"
              class="w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
            />
            <span class="text-sm text-gray-700 font-medium">{{ regiao.nome }}</span>
          </label>
        </div>

        <p v-if="formData.regioesIds.length === 0" class="text-xs text-red-600 mt-2">
          Selecione pelo menos uma região
        </p>
      </div>

      <!-- Botões -->
      <div class="flex gap-3 pt-6 border-t border-gray-200">
        <button
          type="submit"
          :disabled="isLoading"
          class="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <svg v-if="!isLoading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>

          <svg v-else class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>

          {{ isLoading ? 'Criando...' : 'Criar Evento' }}
        </button>

        <button
          type="button"
          @click="resetForm"
          class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-all"
        >
          Limpar
        </button>
      </div>
    </form>

    <!-- Sucesso -->
    <Transition name="fade">
      <div
        v-if="successMessage"
        class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
      >
        <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <p class="text-sm font-semibold text-green-800">Sucesso!</p>
          <p class="text-sm text-green-700 mt-1">{{ successMessage }}</p>
        </div>
      </div>
    </Transition>

    <!-- Erro -->
    <Transition name="fade">
      <div
        v-if="errorMessage"
        class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
      >
        <svg class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <p class="text-sm font-semibold text-red-800">Erro!</p>
          <p class="text-sm text-red-700 mt-1">{{ errorMessage }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { criarEventoExterno } from '~/services/evento-api'
import { fetchRegioes } from '~/services/regiao-api'
import type { Regiao } from '~/types/regiao'
import type { Usuario } from '~/types/usuario'

const formData = ref({
  nome: '',
  dataInicio: new Date().toISOString().slice(0, 16),
  dataFim: new Date().toISOString().slice(0, 16),
  descricao: '',
  regioesIds: [] as number[]
})

const erroData = ref(false)
const regioes = ref<Regiao[]>([])
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

onMounted(async () => {
  try {
    regioes.value = await fetchRegioes()
  } catch (error) {
    console.error('Erro ao carregar regiões:', error)
    errorMessage.value = 'Erro ao carregar regiões'
  }
})

const submitForm = async () => {
  erroData.value = false

  if (new Date(formData.value.dataFim) < new Date(formData.value.dataInicio)) {
    erroData.value = true
    return
  }

  if (formData.value.regioesIds.length === 0) {
    errorMessage.value = 'Selecione pelo menos uma região'
    return
  }

  isLoading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const eventoData = {
      nome: formData.value.nome,
      descricao: formData.value.descricao,
      tipo: 'E',
      regioesIds: formData.value.regioesIds,
      data: new Date(formData.value.dataInicio),
      dataFim: new Date(formData.value.dataFim),
      eventoId: 0,
      usuario: {} as Usuario,
      indicadores: []
    }

    await criarEventoExterno(eventoData)
    successMessage.value = 'Evento criado com sucesso! Verifique a lista de eventos.'
    resetForm()

    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  } catch (error) {
    console.error('Erro ao criar evento:', error)
    errorMessage.value = 'Erro ao criar evento. Tente novamente.'
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  formData.value = {
    nome: '',
    dataInicio: new Date().toISOString().slice(0, 16),
    dataFim: new Date().toISOString().slice(0, 16),
    descricao: '',
    regioesIds: []
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
