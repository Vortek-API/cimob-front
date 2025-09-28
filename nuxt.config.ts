export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app',

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/tw.css'],
  tailwindcss: { cssPath: false, configPath: 'tailwind.config.cjs' },
   runtimeConfig: {
    public: {
      API_URL: process.env.API_URL
    }
  }
})
