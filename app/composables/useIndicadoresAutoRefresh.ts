import { useAutoRefresh } from './useAutoRefresh'
import { reloadIndicadores } from '~/store/indicadores'
import { regiaoSelecionada, setUltimaAtualizacao } from '~/store/filtro'
import { getCurrentWindowTimestampString, advanceCycle } from '~/store/timestamp'

export function useIndicadoresAutoRefresh() {
  function atualizarIndicadores() {
    advanceCycle()
    
    const timestampAtual = getCurrentWindowTimestampString()
    setUltimaAtualizacao(timestampAtual)
    reloadIndicadores(regiaoSelecionada.value!, timestampAtual)
  }

  return useAutoRefresh(atualizarIndicadores)
}
