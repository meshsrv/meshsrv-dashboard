import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  ssr: false,
  hooks: {
    'prerender:routes': ({ routes }) => {
      routes.clear(); // Do not generate any routes (except the defaults)
    },
  },

  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@nuxt/eslint', '@nuxt/ui', '@vue-vine/nuxt'],

  ui: {
    fonts: false,
  },
});
