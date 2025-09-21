<template>
  <main class="flex-1 bg-gray-100 p-8 overflow-auto min-h-screen">
    <div class="flex items-start gap-8">
      <div class="aspect-[3/4] w-[240px] sm:w-[300px] md:w-[360px] lg:w-[420px] xl:w-[460px]">
        <img src="/images/mapaSjc.png" alt="Mapa SJC" class="w-full h-full object-contain" decoding="async" />
      </div>

      <!-- Indicadores e filtro -->
      <div class="flex-1">
        <ComponenteIndicadores />
        <div class="mt-6">
          <MenuRegiao />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
