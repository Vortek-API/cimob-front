<template>
  <div class="flex min-h-screen bg-gray-100"> 
    <Sidebar />
    <div class="flex-1 ml-18">
      <h1 class=" bg-gray-100 text-4xl md:text-5xl font-bold tracking-wide text-blue-900 mt-18">
        INDICADORES DA CIDADE
      </h1>
      <DashboardLayout  class="mt-12"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
import DashboardLayout from '~/components/DashboardLayout.vue'
</script>
