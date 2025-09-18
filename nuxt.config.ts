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
    '@pinia/nuxt'
  ],
  // Only Nuxt + Tailwind pipeline
  css: ['~/assets/css/tailwind.css'],
  tailwindcss: { cssPath: 'app/assets/css/tailwind.css', configPath: 'tailwind.config.cjs' },
  // Ensure CSS @import in tailwind.css is inlined before Tailwind processes
  postcss: {
    plugins: {
      'postcss-import': {},
    }
  }

})
