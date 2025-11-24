<template>
  <UApp>
    <NuxtLayout>
      <Notificacao />
      <TelegramAdminButton />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
	
<script setup lang="ts">
import Notificacao from "~/components/Notificacao.vue";
import TelegramAdminButton from "~/components/TelegramAdminButton.vue";

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
    class: 'font-sans antialiased bg-gray-100 overflow-hidden'
  }
} )
</script>
