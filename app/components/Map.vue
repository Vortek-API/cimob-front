<template>
  <div class="relative w-full h-full bg-gray-100">
    <!-- Map Container -->
    <div class="map-wrap" :class="{ 'opacity-50': isLoading }">
      <div class="map" ref="mapContainer"></div>
    </div>

    <!-- Loading Overlay -->
    <Transition name="fade">
      <div v-if="isLoading" class="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-40">
        <div class="bg-white rounded-lg shadow-xl p-8 text-center">
          <div class="mb-4">
            <svg class="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </div>
          <p class="text-sm font-medium text-gray-900">Carregando mapa...</p>
          <p class="text-xs text-gray-600 mt-1">{{ loadingMessage }}</p>
        </div>
      </div>
    </Transition>

    <!-- Error Overlay -->
    <Transition name="fade">
      <div v-if="errorMsg" class="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
        <div class="bg-white rounded-lg shadow-xl p-8 max-w-sm">
          <div class="flex items-start gap-4">
            <svg class="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="flex-1">
              <h3 class="text-sm font-semibold text-gray-900">Erro ao carregar mapa</h3>
              <p class="text-sm text-gray-600 mt-2">{{ errorMsg }}</p>
              <button
                @click="retryLoadMap"
                class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Map Controls Info (Bottom Right) -->
    <Transition name="slide-up">
      <div v-if="!isLoading && !errorMsg && mapLoaded" class="absolute bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-30 max-w-xs">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <p class="text-xs font-semibold text-gray-900">Dica</p>
            <p class="text-xs text-gray-600 mt-1">Use o zoom e arraste para explorar o mapa. Clique nos ícones para mais detalhes.</p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Layer Toggle (Top Right) -->
    <Transition name="slide-down">
      <div v-if="!isLoading && !errorMsg && mapLoaded" class="absolute top-6 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-30">
        <div class="space-y-2">
          <label class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
            <input
              v-model="showRadars"
              type="checkbox"
              class="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span class="text-sm font-medium text-gray-700">Radares</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
            <input
              v-model="showPontos"
              type="checkbox"
              class="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span class="text-sm font-medium text-gray-700">Pontos de Ônibus</span>
          </label>
        </div>
      </div>
    </Transition>

    <!-- Stats Panel (Top Left) -->
    <Transition name="slide-down">
      <div v-if="!isLoading && !errorMsg && mapLoaded" class="absolute top-6 left-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-30 max-w-xs">
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center">
            <p class="text-2xl font-bold text-blue-600">{{ radarCount }}</p>
            <p class="text-xs text-gray-600 mt-1">Radares</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-green-600">{{ pontoCount }}</p>
            <p class="text-xs text-gray-600 mt-1">Pontos</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Map, MapStyle, config as mapConfig } from '@maptiler/sdk'
import type { FeatureCollection, Point, GeoJsonProperties } from 'geojson'
import { shallowRef, onMounted, onUnmounted, markRaw, ref, watch } from 'vue'
import { getCurrentWindowTimestampString } from '~/store/timestamp'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import { fetchIndicadoresComRadar, fetchRadars } from '~/services/radar-api'
import type { Radar } from '~/types/radar'
import { fetchPontos } from '~/services/ponto-api'
import type { Ponto } from '~/types/ponto'
import { fetchIndicadoresPorRadar } from '~/services/radar-api'
import type { IndicadorRadar } from '~/types/radar'
import { Popup } from '@maptiler/sdk'
import { indicadoresRadar } from '~/store/indicadores'
import { useIndicadoresRadarAutoRefresh } from '~/composables/useIndicadoresAutoRefresh'

useIndicadoresRadarAutoRefresh()

const mapContainer = shallowRef<HTMLElement | null>(null)
const map = shallowRef<Map | null>(null)

// State Management
const isLoading = ref(true)
const mapLoaded = ref(false)
const errorMsg = ref('')
const loadingMessage = ref('Inicializando mapa...')

// Layer Visibility
const showRadars = ref(true)
const showPontos = ref(false)

// Data Counts
const radarCount = ref(0)
const pontoCount = ref(0)

// Popup State
const activePopup = shallowRef<Popup | null>(null)
const selectedRadarId = ref<string | null>(null)
const radarIndicators = ref<IndicadorRadar[]>([])
const isFetchingIndicators = ref(false)

const radarGeojson = ref<FeatureCollection<Point, GeoJsonProperties> | null>(null)

// Watch for layer visibility changes
watch(showRadars, (value) => {
  if (map.value && map.value.getLayer('radars-layer')) {
    map.value.setLayoutProperty('radars-layer', 'visibility', value ? 'visible' : 'none')
  }
})

watch(showPontos, (value) => {
  if (map.value && map.value.getLayer('pontos-layer')) {
    map.value.setLayoutProperty('pontos-layer', 'visibility', value ? 'visible' : 'none')
  }
})

onMounted(async () => {
  try {
    const { public: publicConfig } = useRuntimeConfig()
    mapConfig.apiKey = publicConfig.MAPTILER_API_KEY

    const initialState = { lng: -45.85477630787629, lat: -23.21252050854134, zoom: 12 }

    loadingMessage.value = 'Criando instância do mapa...'

    map.value = markRaw(
      new Map({
        container: mapContainer.value!,
        style: MapStyle.STREETS,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom
      })
    )

      map.value.on('load', async () => {
        // Adicionar listener de clique para radares
        map.value!.on('click', 'radars-layer', handleRadarClick)
        
        // Mudar cursor ao passar sobre radar
        map.value!.on('mouseenter', 'radars-layer', () => {
          map.value!.getCanvas().style.cursor = 'pointer'
        })
        map.value!.on('mouseleave', 'radars-layer', () => {
          map.value!.getCanvas().style.cursor = ''
        })
        
        // Fechar pop-up ao clicar no mapa
        map.value!.on('click', (e) => {
          if (e.originalEvent.target instanceof HTMLElement && e.originalEvent.target.closest('.maplibregl-popup')) {
            return // Não fechar se o clique for dentro do pop-up
          }
          if (activePopup.value) {
            activePopup.value.remove()
            activePopup.value = null
            selectedRadarId.value = null
            radarIndicators.value = []
          }
        })
        
        try {
      try {
        const radarIcons = [
          { path: '/images/radar-icon.png', name: 'radar-icon' },
          { path: '/images/radar-icon-green.png', name: 'radar-icon-green' },
          { path: '/images/radar-icon-orange.png', name: 'radar-icon-orange' },
          { path: '/images/radar-icon-red.png', name: 'radar-icon-red' }
        ]

        for (const icon of radarIcons) {
          loadingMessage.value = `Carregando ícone ${icon.name}...`
          try {
            const img = await map.value!.loadImage(icon.path)
            if (!map.value!.hasImage(icon.name)) {
              map.value!.addImage(icon.name, img.data)
            }
          } catch (err) {
            console.warn(`Falha ao carregar ${icon.path}:`, err)
          }
        }

        loadingMessage.value = 'Buscando dados de radares...'
        const radars = await fetchRadars()
        radarCount.value = radars.length
        addRadarLayer(radars)

        loadingMessage.value = 'Carregando ícones de pontos...'
        await map.value!.loadImage('/images/bus-icon.png')
          .then(img => {
            if (!map.value!.hasImage('bus-icon')) {
              map.value!.addImage('bus-icon', img.data)
            }
          })
          .catch(err => {
            console.error('Erro ao carregar imagem de ponto:', err)
            throw new Error('Falha ao carregar ícone de ponto')
          })

        loadingMessage.value = 'Buscando dados de pontos...'
        const pontos = await fetchPontos()
        pontoCount.value = pontos.length
        addPontoLayer(pontos)

        isLoading.value = false
        mapLoaded.value = true
      } catch (err) {
        console.error('Erro ao carregar camadas do mapa:', err)
        errorMsg.value = err instanceof Error ? err.message : 'Erro desconhecido ao carregar dados do mapa'
        isLoading.value = false
      }
        } catch (err) {
          console.error('Erro ao carregar dados do mapa:', err)
          errorMsg.value = err instanceof Error ? err.message : 'Erro desconhecido ao carregar dados do mapa'
          isLoading.value = false
        }
      })

    map.value.on('error', (err) => {
      console.error('Erro do mapa:', err)
      errorMsg.value = 'Erro ao inicializar o mapa. Verifique sua conexão.'
      isLoading.value = false
    })
  } catch (err) {
    console.error('Erro ao montar mapa:', err)
    errorMsg.value = err instanceof Error ? err.message : 'Erro desconhecido ao inicializar o mapa'
    isLoading.value = false
  }
})

onUnmounted(() => {
  map.value?.off('click', 'radars-layer', handleRadarClick)
  map.value?.off('mouseenter', 'radars-layer', () => {
    map.value!.getCanvas().style.cursor = 'pointer'
  })
  map.value?.off('mouseleave', 'radars-layer', () => {
    map.value!.getCanvas().style.cursor = ''
  })
  map.value?.remove()
})

function addRadarLayer(radars: Radar[]) {
  if (!map.value) return

  const geojson: FeatureCollection<Point, GeoJsonProperties> = {
    type: 'FeatureCollection',
    features: radars.map(radar => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [radar.longitude, radar.latitude]
      },
      properties: {
        id: radar.radarId,
        type: 'radar',
        icon: 'radar-icon'
      }
    }))
  }

  radarGeojson.value = geojson

  if (!map.value.getSource('radars')) {
    map.value.addSource('radars', {
      type: 'geojson',
      data: geojson
    })
  }

  if (!map.value.getLayer('radars-layer')) {
    map.value.addLayer({
      id: 'radars-layer',
      type: 'symbol',
      source: 'radars',
      layout: {
        'icon-image': ['get', 'icon'],
        'icon-size': 1,
        'icon-allow-overlap': true
      }
    })
  }
}

function addPontoLayer(pontos: Ponto[]) {
  if (!map.value) return

  const geojson: FeatureCollection<Point, GeoJsonProperties> = {
    type: 'FeatureCollection',
    features: pontos.map(ponto => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [ponto.longitude, ponto.latitude]
      },
      properties: {
        id: ponto.pontoId,
        type: 'ponto'
      }
    }))
  }

  if (!map.value.getSource('pontos')) {
    map.value.addSource('pontos', {
      type: 'geojson',
      data: geojson
    })
  }

  if (!map.value.getLayer('pontos-layer')) {
    map.value.addLayer({
      id: 'pontos-layer',
      type: 'symbol',
      source: 'pontos',
      layout: {
        'icon-image': 'bus-icon',
        'icon-size': 1,
        'icon-allow-overlap': true,
        'visibility': showPontos.value ? 'visible' : 'none'
      }
    })
  }
}

// --- Lógica de Indicadores por Radar ---

async function handleRadarClick(e: any) {
  if (!e.features || e.features.length === 0) return

  const feature = e.features[0]
  const radarId = feature.properties.id
  const coordinates = feature.geometry.coordinates.slice()

  // Se o pop-up já estiver aberto para este radar, fechar
  if (selectedRadarId.value === radarId) {
    activePopup.value?.remove()
    activePopup.value = null
    selectedRadarId.value = null
    radarIndicators.value = []
    return
  }

  // Fechar pop-up anterior, se houver
  activePopup.value?.remove()
  selectedRadarId.value = radarId
  radarIndicators.value = []
  isFetchingIndicators.value = true

  let indicadores = indicadoresRadar.value.filter(ind => ind.radarId === radarId)
 
  if (indicadores.length === 0) {
    const loadingContent = document.createElement('div')
    loadingContent.className = 'p-2 text-center'
    loadingContent.innerHTML = '<p class="text-sm font-medium text-gray-700">Carregando indicadores...</p>'

    activePopup.value = new Popup({
      closeButton: true,
      closeOnClick: false,
      offset: 25,
      maxWidth: '300px'
    })
      .setLngLat(coordinates)
      .setDOMContent(loadingContent)
      .addTo(map.value!)

    const stopWatcher = watch(indicadoresRadar, (newIndicadores) => {
      const newRadarIndicators = newIndicadores.filter(ind => ind.radarId === radarId)
      
      if (newRadarIndicators.length > 0) {
        stopWatcher()
        isFetchingIndicators.value = false
        radarIndicators.value = newRadarIndicators
        updatePopupContent(coordinates, radarId, newRadarIndicators)
      }
    }, { deep: true })
  } else {
    isFetchingIndicators.value = false
    radarIndicators.value = indicadores
    updatePopupContent(coordinates, radarId, indicadores)
  }
}

function getIconNameFromValor(valor: number | null | undefined) {
  if (valor == null || isNaN(valor)) return 'radar-icon'
  if (valor > 0 && valor < 1.9) return 'radar-icon-green'
  if (valor >= 2 && valor < 2.5) return 'radar-icon-orange'
  if (valor >= 2.5) return 'radar-icon-red'
  return 'radar-icon'
}

function getColorClassForValor(valor: number | null | undefined) {
  if (valor == null || isNaN(valor)) return 'text-gray-700'
  if (valor > 0 && valor < 1.9) return 'text-green-600'
  if (valor >= 2 && valor < 2.5) return 'text-orange-500'
  if (valor >= 2.5) return 'text-red-600'
  return 'text-gray-700'
}

function updatePopupContent(coordinates: [number, number], radarId: string, indicadores: IndicadorRadar[]) {
  if (!map.value) return

  activePopup.value?.remove()

  setTimeout(() => {
    const popupContent = document.createElement('div')
    popupContent.className = 'p-2'
    
    let htmlContent = `<h4 class="text-base font-bold text-gray-900 mb-2">Radar: ${radarId}</h4>`

    if (indicadores.length === 0) {
      htmlContent += '<p class="text-sm text-gray-600">Nenhum indicador encontrado para este radar.</p>'
    } else {
      htmlContent += '<ul class="space-y-1">'
      indicadores.forEach(ind => {
        const valorRaw = ind.indicador?.valor ?? null
        const valorNum = parseFloat(String(valorRaw))
        const colorClass = getColorClassForValor(isNaN(valorNum) ? null : valorNum)

        htmlContent += `
          <li class="flex justify-between items-center text-sm">
            <span class="font-medium text-gray-700">${ind.indicador.nome}:</span>
            <span class="font-semibold ${colorClass}">${ind.indicador.valor}</span>
          </li>
        `
      })
      htmlContent += '</ul>'
    }

    popupContent.innerHTML = htmlContent

    activePopup.value = new Popup({
      closeButton: true,
      closeOnClick: false,
      offset: 25,
      maxWidth: '300px'
    })
      .setLngLat(coordinates)
      .setDOMContent(popupContent)
      .addTo(map.value!)
      
    // Adicionar listener para fechar o pop-up ao clicar no botão de fechar
    activePopup.value.on('close', () => {
      selectedRadarId.value = null
      radarIndicators.value = []
      activePopup.value = null
    })
  }, 50)
}

watch(indicadoresRadar, () => {
  if (!map.value || !radarGeojson.value || !map.value.getSource('radars')) return

  const updated = JSON.parse(JSON.stringify(radarGeojson.value)) as FeatureCollection<Point, GeoJsonProperties>

  updated.features = updated.features.map(f => {
    const radarId = f.properties?.id
    const related = indicadoresRadar.value.filter(ind => ind.radarId === radarId)

    let maxValor = Number.NaN
    if (related.length > 0) {
      maxValor = related.reduce((acc, cur) => {
        const v = parseFloat(String(cur.indicador?.valor ?? NaN))
        if (isNaN(v)) return acc
        return isNaN(acc) ? v : Math.max(acc, v)
      }, Number.NaN)
    }

    const iconName = getIconNameFromValor(isNaN(maxValor) ? null : maxValor)
    f.properties = { ...f.properties, icon: iconName }
    return f
  })

  try {
    (map.value.getSource('radars') as any).setData(updated)
    radarGeojson.value = updated
  } catch (err) {
    console.error('Erro ao atualizar ícones dos radares:', err)
  }
}, { deep: true })
</script>

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Transições */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
