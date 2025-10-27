import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createSharedComposable } from '@vueuse/core'

const _useDashboard = () => {
  const route = useRoute()
  const router = useRouter()
  const isNotificationsSlideoverOpen = ref(false)

  // Global dashboard filters
  const regions = ref<Array<{ label: string; value: string }>>([])
  const radars = ref<Array<{ label: string; value: string }>>([])
  const selectedRegion = ref<string | null>(null)
  const selectedRadar = ref<string | null>(null)

  async function loadFilters() {
    const config = useRuntimeConfig()
    // Se não há API_URL, use listas locais e não tente buscar
    if (!config.public.API_URL) {
      regions.value = regions.value.length ? regions.value : [
        { label: 'Cidade toda', value: 'all' },
        { label: 'Centro', value: '1' },
        { label: 'Sul', value: '2' }
      ]
      radars.value = radars.value.length ? radars.value : [
        { label: 'Todos', value: 'all' },
        { label: 'Radar 01', value: 'radar-01' },
        { label: 'Radar 02', value: 'radar-02' }
      ]
      return
    }
    // Fetch remoto quando configurado
    try {
      const { data: r1 } = await useFetch<Array<{ id: string; name: string }>>('/regions', {
        baseURL: config.public.API_URL,
        server: false
      })
      if (r1.value?.length) {
        regions.value = r1.value.map(r => ({ label: r.name, value: String(r.id) }))
      }
    } catch {}
    if (!regions.value.length) {
      regions.value = [
        { label: 'Cidade toda', value: 'all' },
        { label: 'Centro', value: '1' },
        { label: 'Sul', value: '2' }
      ]
    }

    try {
      const { data: r2 } = await useFetch<Array<{ id: string; name: string }>>('/radars', {
        baseURL: config.public.API_URL,
        server: false
      })
      if (r2.value?.length) {
        radars.value = r2.value.map(r => ({ label: r.name, value: String(r.id) }))
      }
    } catch {}
    if (!radars.value.length) {
      radars.value = [
        { label: 'Todos', value: 'all' },
        { label: 'Radar 01', value: 'radar-01' },
        { label: 'Radar 02', value: 'radar-02' }
      ]
    }
  }

  defineShortcuts({
    'g-h': () => router.push('/'),
    'g-i': () => router.push('/inbox'),
    'g-c': () => router.push('/customers'),
    'g-s': () => router.push('/settings'),
    'n': () => isNotificationsSlideoverOpen.value = !isNotificationsSlideoverOpen.value
  })

  watch(() => route.fullPath, () => {
    isNotificationsSlideoverOpen.value = false
  })

  return {
    isNotificationsSlideoverOpen,
    // filters
    regions,
    radars,
    selectedRegion,
    selectedRadar,
    loadFilters
  }
}

export const useDashboard = createSharedComposable(_useDashboard)
