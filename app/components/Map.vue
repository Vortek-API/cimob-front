<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { Map, MapStyle, Popup, config as mapConfig } from '@maptiler/sdk';
import type { FeatureCollection, Point, GeoJsonProperties } from 'geojson';
import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { fetchRadars } from '~/services/radar-api';
import type { Radar } from '~/types/radar';

const mapContainer = shallowRef<HTMLElement | null>(null);
const map = shallowRef<Map | null>(null);

onMounted(async () => {
  const { public: publicConfig } = useRuntimeConfig()
  mapConfig.apiKey = publicConfig.MAPTILER_API_KEY

  const initialState = { lng: -45.85477630787629, lat: -23.21252050854134, zoom: 12 };

  map.value = markRaw(
    new Map({
      container: mapContainer.value!,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    })
  )

  map.value.on('load', async () => {
    await map.value!.loadImage('/images/radar-icon.png')
      .then(img => {
        if (!map.value!.hasImage('radar-icon')) {
          map.value!.addImage('radar-icon', img.data)
        }
      })
      .catch(err => console.error('Erro ao carregar imagem:', err))

    const radars = await fetchRadars()
    addRadarLayer(radars)
  })
})

onUnmounted(() => {
  map.value?.remove();
});

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
        type: 'radar'
      }
    }))
  };

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
        'icon-image': 'radar-icon',
        'icon-size': 1,
        'icon-allow-overlap': true
      }
    })
  }
}
</script>

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
