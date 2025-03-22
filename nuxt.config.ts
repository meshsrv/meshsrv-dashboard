import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Meshsrv',
    },
  },

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

  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/i18n', '@vue-vine/nuxt'],

  ui: {
    fonts: false,
  },
  colorMode: {
    preference: 'dark',
  },
  i18n: {
    lazy: true,
    strategy: 'prefix_except_default',
    defaultLocale: 'zh_cn',
    locales: [
      { code: 'zh_cn', language: 'zh-CN', file: 'zh_cn.json' },
      { code: 'en', language: 'en', file: 'en.json' },
    ],
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
});
