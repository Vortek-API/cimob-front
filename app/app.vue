<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Ruda:wght@400;500;600;700;800;900&display=swap' }
  ],
  htmlAttrs: {
    class: 'font-sans'
  },
  bodyAttrs: {
    class: 'font-sans antialiased bg-gray-100'
  }
})
</script>
