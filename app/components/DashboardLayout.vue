<template>
  <main class="flex-1 bg-gray-100 p-4 md:p-6 h-screen overflow-hidden">
    <div class="flex items-start gap-6 h-full">
      <div class="aspect-[3/4] h-[48vh] md:h-[52vh] lg:h-[54vh] w-auto">
        <img src="/images/mapaSjc.png" alt="Mapa SJC" class="w-auto h-full object-contain" decoding="async" />
      </div>

      <div class="flex-1">
        <div class="w-fit max-w-full">
          <ComponenteIndicadores />
          <div class="mt-2 flex justify-end w-full">
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
