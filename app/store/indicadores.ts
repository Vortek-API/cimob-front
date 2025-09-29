import { ref } from 'vue'
import { fetchIndicadores } from '~/services/indicador-api'
import type { Indicador } from '~/types/indicador'

export type Card = {
  id: number
  indicador: string
  valor: number
  circulo: string
  // to: string
}

export const cards = ref<Card[]>([])

export async function reloadIndicadores(regiaoId?: number, dataInicial?: string) {
  try {
    const indicadores: Indicador[] = await fetchIndicadores(regiaoId, dataInicial);
    cards.value = indicadores.map(indicador => ({
      id: indicador.indicadorId,
      indicador: indicador.nome,
      valor: indicador.valor,
      circulo: getCor(indicador.valor),
      // to: '/database'
    }))
  } catch (err) {
    console.error('Erro ao atualizar indicadores:', err)
  }
}

function getCor(valor: number) {
  if (valor < 0) 
    return 'bg-grey-500'
  if (valor > 0 && valor < 1.9) 
    return 'bg-green-500'
  if (valor > 2 && valor < 2.5) 
    return 'bg-orange-500'
  if (valor > 2.5) 
    return 'bg-red-500'

  return 'bg-lime-500'
}
