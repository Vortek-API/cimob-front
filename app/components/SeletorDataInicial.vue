<template>
  <div class="flex items-center space-x-4 mb-4">
    <div class="flex items-center space-x-2">
      <label class="text-sm font-medium text-gray-600">
        Data inicial:
      </label>
      <input
        v-model="dataInicial"
        type="datetime-local"
        class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        :min="dataMinima"
        :max="dataMaxima"
      />
    </div>
    
    <button
      @click="atualizarIndicadores"
      :disabled="!dataInicial"
      class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
    >
      Atualizar
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { reloadIndicadores } from '~/store/indicadores'
import { regiaoSelecionada, setDataSelecionada, setUltimaAtualizacao } from '~/store/filtro'

const dataInicial = ref('')
const intervalId = ref<number | null>(null)

function formatLocalDateTimeInput(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

const dataMinima = computed(() => {
  const data = new Date()
  data.setFullYear(data.getFullYear() - 1)
  return formatLocalDateTimeInput(data)
})

const dataMaxima = computed(() => {
  return formatLocalDateTimeInput(new Date())
})

onMounted(() => {
  const agora = new Date()
  dataInicial.value = formatLocalDateTimeInput(agora)
  
  iniciarAtualizacaoAutomatica()
})

onUnmounted(() => {
  pararAtualizacaoAutomatica()
})

function atualizarIndicadores() {
  if (!dataInicial.value) return
  
  setDataSelecionada(dataInicial.value)
  setUltimaAtualizacao(dataInicial.value)
  reloadIndicadores(regiaoSelecionada.value!, dataInicial.value)
}

function iniciarAtualizacaoAutomatica() {
  atualizarIndicadores()
  
  intervalId.value = setInterval(() => {
    incrementarData()
    atualizarIndicadores()
  }, 300000)
}

function pararAtualizacaoAutomatica() {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

function incrementarData() {
  if (!dataInicial.value) return
  
  const dataAtual = new Date(dataInicial.value)
  dataAtual.setMinutes(dataAtual.getMinutes() + 5)
  dataInicial.value = formatLocalDateTimeInput(dataAtual)
}
</script>

<style scoped>
</style>
