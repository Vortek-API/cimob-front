<template>
  <div class="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden shadow-md">
    <!-- Map Container -->
    <div class="map-wrap" :class="{ 'opacity-50': isLoading }">
      <div class="map" ref="mapContainer"></div>
    </div>

    <!-- Loading Overlay -->
    <Transition name="fade">
      <div v-if="isLoading" class="absolute inset-0 bg-white/90 flex items-center justify-center z-40">
        <div class="text-center">
          <div class="mb-3">
            <svg class="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </div>
          <p class="text-sm font-medium text-gray-900">Carregando mapa...</p>
        </div>
      </div>
    </Transition>

    <!-- Error Overlay -->
    <Transition name="fade">
      <div v-if="errorMsg" class="absolute inset-0 bg-white/90 flex items-center justify-center z-40">
        <div class="text-center p-4">
          <svg class="h-8 w-8 text-red-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-sm text-gray-900 font-medium">{{ errorMsg }}</p>
          <button
            @click="retryLoadMap"
            class="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    </Transition>

    <!-- Legend -->
    <Transition name="slide-up">
      <div v-if="!isLoading && !errorMsg && mapLoaded" class="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-30 max-w-xs">
        <p class="text-xs font-semibold text-gray-900 mb-2">Regiões</p>
        <div class="space-y-1.5">
          <div 
            v-for="regiao in regioesPolygons" 
            :key="regiao.regiaoId"
            class="flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
            @click="selectRegiao(regiao.regiaoId)"
          >
            <div 
              class="w-4 h-4 rounded border border-gray-300 flex-shrink-0" 
              :style="{ backgroundColor: regiao.color }"
            ></div>
            <span class="text-gray-700">{{ regiao.nome }}</span>
          </div>
          <div 
            class="flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors border-t border-gray-200 pt-2 mt-2"
            @click="selectRegiao(null)"
          >
            <div class="w-4 h-4 rounded border-2 border-gray-400 flex-shrink-0 bg-white"></div>
            <span class="text-gray-700 font-medium">Todas as regiões</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Selected Region Info -->
    <Transition name="slide-down">
      <div v-if="!isLoading && !errorMsg && mapLoaded && selectedRegiaoId" class="absolute top-4 left-4 bg-blue-600 text-white rounded-lg shadow-lg px-4 py-2 z-30">
        <p class="text-sm font-semibold">{{ getSelectedRegiaoName() }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Map, MapStyle, config as mapConfig } from '@maptiler/sdk'
import type { FeatureCollection, Polygon, GeoJsonProperties } from 'geojson'
import { shallowRef, onMounted, onUnmounted, markRaw, ref, watch } from 'vue'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import { regioesPolygons } from '~/data/regioes-polygons'
import { setRegiaoSelecionada, regiaoSelecionada } from '~/store/filtro'
import { reloadIndicadores } from '~/store/indicadores'
import { getCurrentWindowTimestampString } from '~/store/timestamp'

const mapContainer = shallowRef<HTMLElement | null>(null)
const map = shallowRef<Map | null>(null)

// State Management
const isLoading = ref(true)
const mapLoaded = ref(false)
const errorMsg = ref('')
const selectedRegiaoId = ref<number | null>(regiaoSelecionada.value)

// Watch for external changes to regiaoSelecionada (from MenuRegiao)
watch(regiaoSelecionada, (newValue) => {
  selectedRegiaoId.value = newValue
  updateRegionHighlight(newValue)
})

onMounted(async () => {
  try {
    const { public: publicConfig } = useRuntimeConfig()
    mapConfig.apiKey = publicConfig.MAPTILER_API_KEY

    // Centro de São José dos Campos
    const initialState = { lng: -45.88688, lat: -23.18935, zoom: 11.5 }

    map.value = markRaw(
      new Map({
        container: mapContainer.value!,
        style: MapStyle.STREETS,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,
        maxZoom: 14,
        minZoom: 10
      })
    )

    map.value.on('load', async () => {
      try {
        addRegionLayers()
        
        // Add click handlers
        map.value!.on('click', 'regions-fill', (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0]
            if (feature && feature.properties) {
              const regiaoId = feature.properties.regiaoId
              if (regiaoId) {
                selectRegiao(regiaoId)
              }
            }
          }
        })

        // Change cursor on hover
        map.value!.on('mouseenter', 'regions-fill', () => {
          map.value!.getCanvas().style.cursor = 'pointer'
        })

        map.value!.on('mouseleave', 'regions-fill', () => {
          map.value!.getCanvas().style.cursor = ''
        })

        isLoading.value = false
        mapLoaded.value = true
      } catch (err) {
        console.error('Erro ao carregar camadas do mapa:', err)
        errorMsg.value = 'Erro ao carregar regiões do mapa'
        isLoading.value = false
      }
    })

    map.value.on('error', (err) => {
      console.error('Erro do mapa:', err)
      errorMsg.value = 'Erro ao inicializar o mapa'
      isLoading.value = false
    })
  } catch (err) {
    console.error('Erro ao montar mapa:', err)
    errorMsg.value = 'Erro ao inicializar o mapa'
    isLoading.value = false
  }
})

onUnmounted(() => {
  map.value?.remove()
})

function addRegionLayers() {
  if (!map.value) return

  const geojson: FeatureCollection<Polygon, GeoJsonProperties> = {
    type: 'FeatureCollection',
    features: regioesPolygons.map(regiao => ({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: regiao.coordinates
      },
      properties: {
        regiaoId: regiao.regiaoId,
        nome: regiao.nome,
        color: regiao.color
      }
    }))
  }

  if (!map.value.getSource('regions')) {
    map.value.addSource('regions', {
      type: 'geojson',
      data: geojson
    })
  }

  // Add fill layer
  if (!map.value.getLayer('regions-fill')) {
    map.value.addLayer({
      id: 'regions-fill',
      type: 'fill',
      source: 'regions',
      paint: {
        'fill-color': ['get', 'color'],
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'selected'], false],
          0.6,
          0.3
        ]
      }
    })
  }

  // Add outline layer
  if (!map.value.getLayer('regions-outline')) {
    map.value.addLayer({
      id: 'regions-outline',
      type: 'line',
      source: 'regions',
      paint: {
        'line-color': ['get', 'color'],
        'line-width': [
          'case',
          ['boolean', ['feature-state', 'selected'], false],
          3,
          2
        ],
        'line-opacity': 0.8
      }
    })
  }
}

function selectRegiao(regiaoId: number | null) {
  selectedRegiaoId.value = regiaoId
  setRegiaoSelecionada(regiaoId)
  updateRegionHighlight(regiaoId)
  
  const timestampAtual = getCurrentWindowTimestampString()
  reloadIndicadores(regiaoId || undefined, timestampAtual)
}

function updateRegionHighlight(regiaoId: number | null) {
  if (!map.value || !map.value.getSource('regions')) return

  regioesPolygons.forEach(regiao => {
    map.value!.setFeatureState(
      { source: 'regions', id: regiao.regiaoId },
      { selected: false }
    )
  })

  if (regiaoId) {
    map.value.setFeatureState(
      { source: 'regions', id: regiaoId },
      { selected: true }
    )
  }
}

function getSelectedRegiaoName(): string {
  if (!selectedRegiaoId.value) return ''
  const regiao = regioesPolygons.find(r => r.regiaoId === selectedRegiaoId.value)
  return regiao?.nome || ''
}

function retryLoadMap() {
  errorMsg.value = ''
  isLoading.value = true
  location.reload()
}
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
  transform: translateY(-10px);
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
