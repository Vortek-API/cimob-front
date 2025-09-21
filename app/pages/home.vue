<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <DashboardLayout />
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
import DashboardLayout from '~/components/DashboardLayout.vue'
</script>
