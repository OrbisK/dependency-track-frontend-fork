export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxt/ui', '@vueuse/nuxt', '@nuxtjs/i18n'],
  devtools: { enabled: true },
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        // { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        // { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        // { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: '/api',
    },
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    routeRules: {
      '/': { redirect: { to: '/dashboard', statusCode: 301 } },
    },
  },
  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English' },
      { code: 'de', name: 'German' },
    ],
  },
})
