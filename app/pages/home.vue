<template>
  <div class="flex min-h-screen bg-gray-100"> 
    <Sidebar />
    <div class="flex-1">
      <div class="px-8 md:px-10 mt-8 max-w-6xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold tracking-wide text-blue-900">
          INDICADORES DA CIDADE
        </h1>
        <DashboardLayout class="mt-8"/>
        <h1 class="text-4xl md:text-4xl font-bold tracking-wide text-blue-900">
          Índices críticos
        </h1>
        <TabelaIndiciesCriticos class="mt-6 mb-12" max-height="calc(100vh - 420px)"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
