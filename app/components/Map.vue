<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { fetchRadars } from '~/services/radar-api';
import type { Radar } from '~/types/radar';

const mapContainer = shallowRef<HTMLElement | null>(null);
const map = shallowRef<Map | null>(null);

onMounted(async () => {
  config.apiKey = '1QOxUIVLS3xCNYdD68Gu';

  const initialState = { lng: -45.85477630787629, lat: -23.21252050854134, zoom: 12 };

  map.value = markRaw(new Map({
    container: mapContainer.value!,
    style: MapStyle.STREETS,
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom
  }));

  // Busca os radares e adiciona os marcadores
  const radars = await fetchRadars();
  addRadarMarkers(radars);
});

onUnmounted(() => {
  map.value?.remove();
});

// Função para adicionar marcadores de radar
function addRadarMarkers(radars: Radar[]) {
  if (!map.value) return;
  radars.forEach(radar => {
    new Marker({ color: "#113E63" })
      .setLngLat([radar.longitude, radar.latitude])
      .addTo(map.value!);
  });
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
