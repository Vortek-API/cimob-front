export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app',

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      MAPTILER_API_KEY: process.env.MAPTILER_API_KEY,
      // Bypass auth guards during local development
      // Default: validação ativa. Só faz bypass quando explicitamente solicitado.
      AUTH_BYPASS: process.env.NUXT_AUTH_BYPASS != null
        ? process.env.NUXT_AUTH_BYPASS === '1'
        : false
    }
  },
  colorMode: {
    // Force light mode across the app
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode-force-light'
  },
  // Global CSS (includes Nuxt UI via import inside tailwind.css)
  css: [
    '~/assets/css/tailwind.css'
  ],
  // Tailwind v4 PostCSS plugin
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  }
})
