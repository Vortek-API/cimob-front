import { ref, computed } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { getApi } from '~/config/axios-config'
import type { Range } from '~/types'

export type RegistroApi = {
  registroVelocidadeId?: string
  radarId?: string
  regiaoId?: string | number
  tipoVeiculo?: string
  velocidade?: string | number
  velocidadePermitida?: string | number
  data?: string | Date
  deletado?: string
}

export type RegistroVelocidade = {
  data: string
  tipoVeiculo: string
  velocidade: number
  velocidadePermitida: number
  radar: string
  regiao: number
}

function parseBrDateToISO(d: string | Date | undefined): string {
  if (!d) return new Date().toISOString().slice(0, 10)
  if (d instanceof Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString().slice(0, 10)
  }
  const parts = d.split('/')
  if (parts.length === 3) {
    const [dd, mm, yy] = parts
    const day = Number(dd)
    const mon = Number(mm) - 1
    const year = 2000 + Number(yy)
    const dt = new Date(year, mon, day)
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).toISOString().slice(0, 10)
  }
  const dt = new Date(d)
  return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).toISOString().slice(0, 10)
}

function formatDateToBrShort(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)
  return `${day}/${month}/${year}`
}

function normalizeRegistro(r: RegistroApi): RegistroVelocidade {
  return {
    data: parseBrDateToISO(r.data),
    tipoVeiculo: String(r.tipoVeiculo ?? ''),
    velocidade: Number(r.velocidade ?? 0),
    velocidadePermitida: Number(r.velocidadePermitida ?? 0),
    radar: String(r.radarId ?? (r as any).radar ?? ''),
    regiao: Number(r.regiaoId ?? (r as any).regiao ?? 0)
  }
}

const _useRegistrosVelocidade = () => {
  const registros = ref<RegistroVelocidade[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  let abortCtrl: AbortController | null = null

  async function fetchRegistros(range: Range, radarId?: string | null, regiaoId?: number | null, limit?: number) {
    if (abortCtrl) abortCtrl.abort()
    abortCtrl = new AbortController()
    loading.value = true
    error.value = null
    try {
      const api = getApi()
      const params: Record<string, string> = {}
      if (limit && limit > 0) params.limit = String(limit)
      if (radarId && radarId !== 'all') params.radarId = radarId
      if (regiaoId != null) params.regiaoId = String(regiaoId)
      console.log('[fetchRegistros] GET /registros-velocidade/filtro', params)
      const { data } = await api.get<RegistroApi[]>('/registros-velocidade/filtro', { params, signal: abortCtrl.signal })
      console.log('[fetchRegistros] response', data)
      const mapped = (data ?? []).map(normalizeRegistro)
      registros.value = mapped
    } catch (err) {
      const code = (err as any)?.code
      const name = (err as any)?.name
      if (code === 'ERR_CANCELED' || name === 'CanceledError') {
        console.warn('[fetchRegistros] requisição cancelada')
        return
      }
      console.error('Erro ao buscar registros de velocidade', err)
      registros.value = []
      error.value = 'Não foi possível carregar os registros de velocidade.'
    } finally {
      abortCtrl = null
      loading.value = false
    }
  }

  function cancelarBusca() {
    if (abortCtrl) {
      abortCtrl.abort()
      abortCtrl = null
    }
    loading.value = false
  }

  const radarOptions = computed(() => {
    const ids = Array.from(new Set(registros.value.map(r => r.radar).filter(Boolean)))
    return [
      { label: 'Todos', value: 'all' },
      ...ids.map(id => ({ label: String(id), value: String(id) }))
    ]
  })

  const regiaoOptions = computed(() => {
    const ids = Array.from(new Set(registros.value.map(r => r.regiao).filter(v => !Number.isNaN(v))))
    ids.sort((a, b) => a - b)
    return [
      { label: 'Todas as regiões', value: null },
      ...ids.map(id => ({ label: `Região ${id}`, value: id }))
    ]
  })

  return {
    registros,
    loading,
    error,
    radarOptions,
    regiaoOptions,
    fetchRegistros,
    cancelarBusca
  }
}

export const useRegistrosVelocidade = createSharedComposable(_useRegistrosVelocidade)
