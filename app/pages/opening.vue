<template>
  <DashboardLayout>
    <h1 class="text-2xl font-bold mb-4">Login</h1>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '~/components/Opening.vue' 

definePageMeta({
  requiresAuth: true
});
</script>
