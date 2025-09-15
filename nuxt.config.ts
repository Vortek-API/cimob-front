// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app',
  // Compilaremos o Tailwind via CLI; sem depender do Vite/PostCSS

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  // Injeta o CSS já compilado (gerado pelo CLI do Tailwind)
  css: ['~/assets/css/tw.css'],
  // Desativa a injeção automática do CSS pelo módulo, mantendo a config
  tailwindcss: { cssPath: false, configPath: 'tailwind.config.cjs' }

})
