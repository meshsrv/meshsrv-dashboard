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

  runtimeConfig: {
    public: {
      apiBase: '/api',
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
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3090',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
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
    strategy: 'no_prefix',
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
