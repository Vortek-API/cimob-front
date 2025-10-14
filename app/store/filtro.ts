import { ref } from 'vue'

export const regiaoSelecionada = ref<number | null>(null)
export const ultimaAtualizacao = ref<string | null>(null)
export const isFiltered = ref(false)

export function setRegiaoSelecionada(regiaoId: number | null) {
  regiaoSelecionada.value = regiaoId
  isFiltered.value = regiaoId !== null
}

export function setUltimaAtualizacao(data: string) {
  ultimaAtualizacao.value = data
}

export function clearFiltro() {
  regiaoSelecionada.value = null
  ultimaAtualizacao.value = null
  isFiltered.value = false
}
