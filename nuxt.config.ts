// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon'
  ],
  app: {
    head: {
      title: 'Kalkulator Produktivitas Jasa'
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {}, // Tailwind plugin
      autoprefixer: {}, // Handles browser prefixes
      "postcss-preset-env": {
        stage: 1,
        features: {
          "color-function": true,
        },
      },
    },
  }
})
