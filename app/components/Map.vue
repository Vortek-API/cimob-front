<template>
  <div class="relative w-full h-full bg-gradient-to-br from-slate-100 to-slate-50">
    <!-- Map Container -->
    <div class="map-wrap absolute inset-0" :class="{ 'opacity-50': isLoading }">
      <div class="map w-full h-full" ref="mapContainer"></div>
    </div>

    <!-- Loading Overlay -->
    <Transition name="fade">
      <div v-if="isLoading" class="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm">
          <div class="mb-6">
            <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </div>
          <p class="text-lg font-semibold text-slate-900 mb-2">Carregando mapa</p>
          <p class="text-sm text-slate-600">{{ loadingMessage }}</p>
          <div class="mt-4 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-full w-2/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Error Overlay -->
    <Transition name="fade">
      <div v-if="errorMsg" class="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-sm">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-slate-900">Erro ao carregar mapa</h3>
              <p class="text-sm text-slate-600 mt-2">{{ errorMsg }}</p>
                <button
                @click="retryLoadMap"
                class="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Legend (Bottom Left) - Corrigido para o estilo da imagem -->
    <Transition name="slide-up">
      <div v-if="!isLoading && !errorMsg && mapLoaded" class="absolute bottom-6 left-6 bg-white rounded-lg shadow-xl p-4 z-30 max-w-xs">
        <p class="text-base font-semibold text-gray-900 mb-3">Regiões</p>
        <div class="space-y-2">
          <div 
            v-for="regiao in regioesPolygons" 
            :key="regiao.regiaoId"
            class="flex items-center gap-3 cursor-pointer"
            @click="selectRegiao(regiao.regiaoId)"
          >
            <div 
              class="w-4 h-4 rounded-sm flex-shrink-0" 
              :style="{ backgroundColor: regiao.color }"
            ></div>
            <span class="text-sm text-gray-700">{{ regiao.nome }}</span>
          </div>
          
          <!-- Opção "Todas as regiões" com checkbox -->
          <div 
            class="flex items-center gap-3 pt-3 border-t border-gray-200 mt-3 cursor-pointer"
            @click="selectRegiao(null)"
          >
            <input
              type="checkbox"
              :checked="selectRegiao === null"
              class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              @change="selectRegiao(null)"
            />
            <span class="text-sm text-gray-700">Todas as regiões</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Layer Toggle (Top Right) - Mantido -->
    <Transition name="slide-down">
      <div v-if="!isLoading && !errorMsg && mapLoaded" class="absolute top-6 right-6 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-30 backdrop-blur-sm bg-white/95">
        <div class="space-y-3">
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-widest px-2">Camadas</h3>
          <label class="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
            <input
              v-model="showRadars"
              type="checkbox"
              class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <span class="text-sm font-medium text-slate-700">Radares</span>
            <span class="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">{{ radarCount }}</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
            <input
              v-model="showPontos"
              type="checkbox"
              class="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500 cursor-pointer"
            />
            <span class="text-sm font-medium text-slate-700">Pontos de Ônibus</span>
            <span class="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">{{ pontoCount }}</span>
          </label>
        </div>
      </div>
    </Transition>

    <!-- Info Tip (Bottom Right) - Mantido -->
    <Transition name="slide-up">
      <div v-if="!isLoading && !errorMsg && mapLoaded" class="absolute bottom-6 right-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-blue-200 p-4 z-30 max-w-xs backdrop-blur-sm">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-xs font-bold text-blue-900 uppercase tracking-widest">Dica</p>
            <p class="text-sm text-blue-700 mt-1">Use zoom e arraste para explorar. Clique nos ícones para mais detalhes sobre radares e pontos.</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Map, MapStyle, config as mapConfig, type StyleImageInterface } from '@maptiler/sdk'
import type { FeatureCollection, Point, Polygon, GeoJsonProperties } from 'geojson'
import { shallowRef, onMounted, onUnmounted, markRaw, ref, watch } from 'vue'
// CORREÇÃO: Adicionado useRuntimeConfig, que estava faltando
import { useRuntimeConfig } from '#app'
// CORREÇÃO: Removido getCurrentWindowTimestampString, que não estava sendo usado
// import { getCurrentWindowTimestampString } from '~/store/timestamp' 
import '@maptiler/sdk/dist/maptiler-sdk.css'
import { fetchIndicadoresComRadar, fetchRadars } from '~/services/radar-api'
import { regioesPolygons } from '~/data/regioes-polygons'
import type { Radar } from '~/types/radar'
import { fetchPontos } from '~/services/ponto-api'
import type { Ponto } from '~/types/ponto'
import { fetchIndicadoresPorRadar } from '~/services/radar-api'
import { listarEventos } from '~/services/evento-api'
import type { Evento } from '~/types/evento'
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
const showPontos = ref(true)

// Data Counts
const radarCount = ref(0)
const pontoCount = ref(0)

// Popup State
const activePopup = shallowRef<Popup | null>(null)
const selectedRadarId = ref<string | null>(null)
const radarIndicators = ref<IndicadorRadar[]>([])
const isFetchingIndicators = ref(false)

const radarGeojson = ref<FeatureCollection<Point, GeoJsonProperties> | null>(null)
const activeEventRegions = ref<Set<number>>(new Set())

// CORREÇÃO: Função auxiliar para obter o nome do ícone (necessária para o watch)
function getIconNameFromValor(valor: number | null, regiaoId: number): string {
  // Se há evento ativo na região, usa ícone roxo
  if (activeEventRegions.value.has(regiaoId)) return 'radar-icon-purple'
  
  if (valor === null || isNaN(valor)) return 'radar-icon'
  if (valor >= 2.5) return 'radar-icon-red'
  if (valor >= 1.9) return 'radar-icon-orange'
  return 'radar-icon-green'
}

// CORREÇÃO: Função auxiliar para obter a classe de cor (necessária para o popup)
function getColorClassForValor(valor: number | null | undefined) {
  if (valor == null || isNaN(valor)) return 'text-gray-700'
  if (valor > 0 && valor < 1.9) return 'text-green-600'
  if (valor >= 2 && valor < 2.5) return 'text-orange-500'
  if (valor >= 2.5) return 'text-red-600'
  return 'text-gray-700'
}

// CORREÇÃO: Função auxiliar para atualizar o conteúdo do popup (necessária para o click do mapa)
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
        const colorClass = getColorClassForValor(ind.indicador?.valor)
        htmlContent += `
          <li class="flex justify-between items-center text-sm">
            <span class="text-gray-600">${ind.indicador}:</span>
            <span class="font-semibold ${colorClass}">${ind.radarId?.fixed() ?? 'N/A'}</span>
          </li>
        `
      })
      htmlContent += '</ul>'
    }

    popupContent.innerHTML = htmlContent

    activePopup.value = new Popup({ offset: 25 })
      .setLngLat(coordinates)
      .setDOMContent(popupContent)
      .addTo(map.value!)
  }, 0)
}

async function loadMapIcons(icons: { path: string; name: string }[]): Promise<void> {
  if (!map.value) return;

  for (const icon of icons) {
    try {
      // loadImage retorna GetResourceResponse
      const response = await map.value.loadImage(icon.path);

      // response.data contém o HTMLImageElement | ImageBitmap
      const image = response.data;

      if (image && !map.value.hasImage(icon.name)) {
        map.value.addImage(icon.name, image);
      }
    } catch (err) {
      console.error(`Erro ao carregar ícone ${icon.name}:`, err);
    }
  }
}

async function loadActiveEvents() {
  try {
    const eventos: Evento[] = await listarEventos()
    const now = new Date()
    
    // Limpa o set de regiões ativas
    activeEventRegions.value.clear()
    
    // Verifica quais eventos estão ativos agora
    eventos.forEach(evento => {
      const dataInicio = new Date(evento.dataInicio)
      const dataFim = new Date(evento.dataFim)
      
      // Se o evento está ativo (entre data de início e fim)
      if (now >= dataInicio && now <= dataFim) {
        // Adiciona todas as regiões deste evento ao set
        evento.regioes.forEach(regiao => {
          activeEventRegions.value.add(regiao.regiaoId)
        })
      }
    })
    
    console.log('Regiões com eventos ativos:', Array.from(activeEventRegions.value))
  } catch (error) {
    console.error('Erro ao carregar eventos ativos:', error)
  }
}


async function loadMapData() {
  if (!map.value) return

  // Busca os radares
  const radars: Radar[] = await fetchRadars()
  radarCount.value = radars.length

  // Converte dados de radares para GeoJSON
  const radarFeatures = radars.map(r => ({
    type: 'Feature' as const,
    geometry: {
      type: 'Point' as const,
      coordinates: [r.longitude, r.latitude]
    },
    properties: {
      id: r.radarId,
      regiaoId: r.regiaoId,
      nome: r.endereco,
      icon: 'radar-icon' // Ícone padrão, será atualizado pelo watcher
    }
  }))

  radarGeojson.value = {
    type: 'FeatureCollection',
    features: radarFeatures
  }

  // Carrega eventos ativos
  await loadActiveEvents()

  // Adiciona camada de radares
  addRegionLayers()
  addRadarLayers(radarGeojson.value)
  const pontos = await fetchPontos()
        pontoCount.value = pontos.length
        addPontoLayers(pontos)

  // Adiciona listeners de click para radares
  map.value.on('click', 'radars-layer', async (e) => {
    if (e.features && e.features.length > 0) {
      const feature = e.features[0]
      const radarId = feature!.properties?.id
      const coordinates = (feature!.geometry as Point).coordinates as [number, number]

      if (radarId) {
        isFetchingIndicators.value = true
        try {
          const indicadores = await fetchIndicadoresPorRadar(radarId)
          radarIndicators.value = indicadores
          updatePopupContent(coordinates, radarId, indicadores)
        } catch (error) {
          console.error('Erro ao buscar indicadores:', error)
          updatePopupContent(coordinates, radarId, [])
        } finally {
          isFetchingIndicators.value = false
        }
      }
    }
  })

  // Adiciona listeners de click para pontos
  map.value.on('click', 'pontos-layer', (e) => {
    if (e.features && e.features.length > 0) {
      const feature = e.features[0]
      const nome = feature!.properties?.nome || 'Ponto de Ônibus'
      const coordinates = (feature!.geometry as Point).coordinates as [number, number]

      activePopup.value?.remove()
      activePopup.value = new Popup({ offset: 25 })
        .setLngLat(coordinates)
        .setHTML(`<h4 class="text-base font-bold text-gray-900">${nome}</h4><p class="text-sm text-gray-600">Ponto de ônibus</p>`)
        .addTo(map.value!)
    }
  })

  // Atualiza ícones com base nos indicadores iniciais
  updateRadarIcons()

  loadingMessage.value = 'Mapa carregado!'
  isLoading.value = false
  mapLoaded.value = true
}

function addRadarLayers(geojson: FeatureCollection<Point, GeoJsonProperties>) {
  if (!map.value) return

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
        'icon-allow-overlap': true,
        'icon-size': 0.5
      }
    })
  }
}

async function addPontoLayers(pontos: Ponto[]) {
  if (!map.value) return

  const pontoGeojson: FeatureCollection<Point, GeoJsonProperties> = {
    type: 'FeatureCollection',
    features: pontos.map(p => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [p.longitude, p.latitude]
      },
      properties: {
        id: p.id,
        nome: p.nome
      }
    }))
  }

  if (!map.value.getSource('pontos')) {
    map.value.addSource('pontos', {
      type: 'geojson',
      data: pontoGeojson
    })
  }

  // Carrega a imagem do ícone de forma assíncrona
  if (!map.value.hasImage('bus-icon')) {
    const image = await map.value.loadImage('/images/bus-icon.png')
    map.value.addImage('bus-icon', image.data!)
  }

  if (!map.value.getLayer('pontos-layer')) {
    map.value.addLayer({
      id: 'pontos-layer',
      type: 'symbol',
      source: 'pontos',
      layout: {
        'icon-image': 'bus-icon',
        'icon-size': 0.5,
        'visibility': showPontos.value ? 'visible' : 'none'
      }
    })
  }
}


function addRegionLayers() {
  if (!map.value) return

  const geojson: FeatureCollection<Polygon, GeoJsonProperties> = {
    type: 'FeatureCollection',
    features: regioesPolygons.map(regiao => ({
      type: 'Feature',
      id: regiao.regiaoId, // Usando id para setFeatureState
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

function updateRegionHighlight(regiaoId: number | null) {
  if (!map.value) return

  // Reset previous state
  regioesPolygons.forEach(regiao => {
    map.value!.setFeatureState(
      { source: 'regions', id: regiao.regiaoId },
      { selected: false }
    )
  })

  // Set new state
  if (regiaoId !== null) {
    map.value!.setFeatureState(
      { source: 'regions', id: regiaoId },
      { selected: true }
    )
  }
}

function updateRadarIcons() {
  if (!map.value || !radarGeojson.value) return

  const updatedGeojson: FeatureCollection<Point, GeoJsonProperties> = {
    ...radarGeojson.value,
    features: radarGeojson.value.features.map(f => {
      const radarId = f.properties?.id
      const regiaoId = f.properties?.regiaoId
      const related = indicadoresRadar.value.filter(i => i.radarId === radarId)

      let maxValor: number | null = null
      if (related.length > 0) {
        maxValor = related.reduce((acc: number | null, cur) => {
          const v = parseFloat(String(cur.indicador?.valor ?? NaN))
          if (isNaN(v)) return acc
          return acc === null || v > acc ? v : acc
        }, null)
      }

      const iconName = getIconNameFromValor(maxValor, regiaoId)
      f.properties = { ...f.properties, icon: iconName }
      return f
    })
  }

  try {
    // Atualiza a fonte de dados do mapa
    (map.value.getSource('radars') as any).setData(updatedGeojson)
    radarGeojson.value = updatedGeojson // Mantém a referência local atualizada
  } catch (err) {
    console.error('Erro ao atualizar ícones dos radares:', err)
  }
}

function selectRegiao(regiaoId: number | null) {
  // Ação de seleção de região
}

function getSelectedRegiaoName(): string {
  // Retorna o nome da região selecionada
  return ''
}

function retryLoadMap() {
  errorMsg.value = ''
  isLoading.value = true
  location.reload()
}

onMounted(async () => {
  try {
    const { public: publicConfig } = useRuntimeConfig()
    mapConfig.apiKey = publicConfig.MAPTILER_API_KEY

    // Centro de São José dos Campos
    const initialState = { lng: -45.85477630787629, lat: -23.21252050854134, zoom: 11 }

    loadingMessage.value = 'Criando instância do mapa...'

    map.value = markRaw(
      new Map({
        container: mapContainer.value!,
        style: MapStyle.STREETS,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom
      })
    )
    
    // CORREÇÃO: O bloco map.value?.on('load', ...) estava incompleto e mal estruturado.
    // A lógica foi movida para dentro de uma função assíncrona para melhor controle de fluxo.
    map.value.on('load', async () => {
      try {
        addRegionLayers()

        const radarIcons = [
          { path: '/images/radar-icon.png', name: 'radar-icon' },
          { path: '/images/radar-icon-green.png', name: 'radar-icon-green' },
          { path: '/images/radar-icon-orange.png', name: 'radar-icon-orange' },
          { path: '/images/radar-icon-red.png', name: 'radar-icon-red' },
          { path: '/images/radar-icon-purple.png', name: 'radar-icon-purple' }
        ]
        await loadMapIcons(radarIcons)

        await loadMapData()

      } catch (e) {
        console.error('Erro durante o carregamento do mapa:', e)
        errorMsg.value = 'Não foi possível carregar os dados do mapa. Verifique a conexão com a API.'
        isLoading.value = false
      }
    })

  } catch (e) {
    console.error('Erro na inicialização do mapa:', e)
    errorMsg.value = 'Falha ao inicializar o mapa. Verifique a chave da API.'
    isLoading.value = false
  }
})

onUnmounted(() => {
  map.value?.remove()
  // Limpa o intervalo de verificação de eventos
  if (eventCheckInterval) {
    clearInterval(eventCheckInterval)
  }
})

// Intervalo para verificar eventos ativos a cada minuto
let eventCheckInterval: NodeJS.Timeout | null = null

// Inicia verificação periódica de eventos após o mapa carregar
watch(mapLoaded, (loaded) => {
  if (loaded && !eventCheckInterval) {
    // Verifica eventos a cada 60 segundos
    eventCheckInterval = setInterval(async () => {
      await loadActiveEvents()
      updateRadarIcons()
    }, 60000)
  }
})


// Watcher para atualização dos ícones dos radares (baseado no store de indicadores)
watch(indicadoresRadar, updateRadarIcons, { deep: true })

// Watcher para visibilidade das camadas
watch(showRadars, (visible) => {
  if (map.value) {
    map.value.setLayoutProperty('radars-layer', 'visibility', visible ? 'visible' : 'none')
  }
})

watch(showPontos, (visible) => {
  if (map.value) {
    map.value.setLayoutProperty('pontos-layer', 'visibility', visible ? 'visible' : 'none')
  }
})

// Watcher para eventos ativos (atualiza ícones quando eventos mudam)
watch(activeEventRegions, updateRadarIcons, { deep: true })

// CORREÇÃO: Adicionado defineExpose para expor a função retryLoadMap usada no template
defineExpose({
  retryLoadMap
})
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}

.map-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active,
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
