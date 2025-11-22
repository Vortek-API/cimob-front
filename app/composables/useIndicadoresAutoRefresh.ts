import { useAutoRefresh } from './useAutoRefresh'
import { reloadIndicadores, reloadIndicadoresRadar } from '~/store/indicadores'
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

export function useIndicadoresRadarAutoRefresh() {
  function atualizarIndicadoresRadar() {
    advanceCycle()
    
    const timestampAtual = getCurrentWindowTimestampString()
    reloadIndicadoresRadar(timestampAtual)
  }

  return useAutoRefresh(atualizarIndicadoresRadar)
}
