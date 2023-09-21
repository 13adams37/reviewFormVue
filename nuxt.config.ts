// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
import { resolve } from 'path';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  app: { baseURL: '/reviewFormVue/', buildAssetsDir: 'assets' },
  alias: {
    '@': resolve(__dirname, '/'),
  },
  ssr: true,
  css: ['~/assets/styles/main.scss', '~/assets/styles/_fonts.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: false },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: ['@pinia/nuxt', 'vuetify-nuxt-module'],
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  vite: {
    esbuild: {
      drop: ['console', 'debugger'],
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },
});
