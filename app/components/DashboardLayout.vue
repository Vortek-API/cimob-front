<template>
  <main class="flex-1 bg-gray-100 p-6">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-[320px_1fr] lg:grid-cols-[320px_1fr] xl:grid-cols-[320px_1fr] gap-8 items-start">
        <div class="w-full md:-mt-2">
          <div class="aspect-[3/4] w-full overflow-hidden">
            <img src="/images/mapaSjc.png" alt="Mapa SJC" class="w-full h-full object-contain object-left -ml-4 md:-ml-6" decoding="async" />
          </div>
        </div>

        <div class="w-full max-w-[860px]">
          <ComponenteIndicadores />
          <div class="mt-3 flex justify-end">
            <MenuRegiao />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
