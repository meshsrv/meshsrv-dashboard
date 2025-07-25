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
      // FIXME: since both nitro devProxy and vite server proxy have some issues
      // with proxy websocket, we use wsBase instead.
      // override in dev env with NUXT_PUBLIC_WS_BASE.
      wsBase: '/ws',
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
          target: 'https://localhost:3090',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/swagger': {
          target: 'https://localhost:3090',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  },

  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@vue-vine/nuxt',
    'vue-sonner/nuxt',
  ],

  piniaPluginPersistedstate: {
    storage: 'localStorage',
  },
  ui: {
    fonts: false,
  },
  colorMode: {
    preference: 'dark',
  },
  i18n: {
    lazy: true,
    strategy: 'no_prefix',
    locales: [
      { code: 'zh_cn', language: 'zh-CN', file: 'zh_cn.json' },
      { code: 'en', language: 'en', file: 'en.json' },
    ],
    defaultLocale: 'zh_cn',
    bundle: {
      optimizeTranslationDirective: false,
    },
    experimental: {
      typedOptionsAndMessages: 'default',
    },
  },
});
