import { ref } from 'vue'
import { fetchIndicadores } from '~/services/indicador-api'
import type { Indicador } from '~/types/indicador'


export type Card = {
  id: number
  indicador: string
  valor: number
  circulo: string
  corValor: string
  // to: string
}

export const cards = ref<Card[]>([])
export const isLoadingIndicadores = ref<boolean>(false)
export const indicadoresError = ref<string | null>(null)

export async function reloadIndicadores(regiaoId?: number, timestamp?: string) {
  try {
    isLoadingIndicadores.value = true
    indicadoresError.value = null
    const indicadores: Indicador[] = await fetchIndicadores(regiaoId, timestamp);


    cards.value = indicadores.map(indicador => {
      

      const valorCalculado = indicador.valor 

      const estilo = getEstiloPorValor(valorCalculado) 

      return {
        id: indicador.indicadorId,
        indicador: indicador.nome,
        valor: valorCalculado, 
        circulo: estilo.corCirculo, 
        corValor: estilo.corTexto 
        // to: '/database'
      }
    })
  } catch (err: any) {
    console.error('Erro ao atualizar indicadores:', err)
    indicadoresError.value = err?.message || 'Erro ao carregar indicadores'
    cards.value = []
  } finally {
    isLoadingIndicadores.value = false
  }
}


function getEstiloPorValor(valor: number): { corCirculo: string, corTexto: string } {
  if (valor < 0) 
    return { corCirculo: 'bg-grey-500', corTexto: 'text-grey-600' }
  if (valor > 0 && valor < 1.9) 
    return { corCirculo: 'bg-green-500', corTexto: 'text-green-600' }
  if (valor > 2 && valor < 2.5) 
    return { corCirculo: 'bg-orange-500', corTexto: 'text-orange-600' }
  if (valor > 2.5) 
    return { corCirculo: 'bg-red-500', corTexto: 'text-red-600' }

  return { corCirculo: 'bg-lime-500', corTexto: 'text-lime-600' }
}