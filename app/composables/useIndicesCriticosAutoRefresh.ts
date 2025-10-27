import { ref, readonly } from 'vue'
import { useAutoRefresh } from './useAutoRefresh'
import { fetchIndicesCriticos } from '~/services/indicador-api'
import { getCurrentWindowTimestampString, advanceCycle } from '~/store/timestamp'

export function useIndicesCriticosAutoRefresh() {
  const rows = ref<any[]>([])
  const isLoading = ref(false)
  const errorMsg = ref<string | null>(null)

  async function loadData() {
    try {
      isLoading.value = true
      errorMsg.value = null
      
      advanceCycle()
      
      const timestampAtual = getCurrentWindowTimestampString()
      const json = await fetchIndicesCriticos(undefined, timestampAtual)
      rows.value = json.map(item => ({
        endereco: item.endereco || '—',
        regiao: item.regiaoNome || '—',
        intervalo: item.dataHora || '—',
        velocidadePermitida: item.velocidadePermitida,
        velocidadeRegistrada: item.velocidadeRegistrada,
      }))
    } catch (e: any) {
      errorMsg.value = e?.message || 'Erro ao buscar índices críticos'
    } finally {
      isLoading.value = false
    }
  }

  const autoRefresh = useAutoRefresh(loadData)

  return {
    rows: readonly(rows),
    isLoading: readonly(isLoading),
    errorMsg: readonly(errorMsg),
    ...autoRefresh
  }
}
