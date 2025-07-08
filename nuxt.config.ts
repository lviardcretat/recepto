// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // Must be loaded before @nuxtjs/i18n
    'nuxt-zod-i18n',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxt/ui-pro', // Comment it for local bdd
    '@nuxthub/core',
    '@nuxt/eslint',
  ],
  $development: {
    // Comment it for local bdd
    hub: {
      remote: true,
    },
  },
  ssr: true,
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'fr',
      },
      title: 'Recepto',
      charset: 'utf-8',
      meta: [],
      link: [{ rel: 'icon', href: '/logo.png' }],
    },
  },
  css: ['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-01-01',
  nitro: {
    replace: {
      // https://github.com/betterwrite/pdfeasy/issues/18#issuecomment-2619794759
      // replace the browser detection in a server lib
      'globalThis.navigator': 'undefined',
      'global.navigator': 'undefined',
    },
    experimental: {
      tasks: true,
      openAPI: true,
    },
  },
  hub: {
    // Comment it for local bdd
    database: true,
    blob: true,
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: 'single',
        arrowParens: false,
      },
    },
  },
  i18n: {
    defaultLocale: 'fr',
    // https://github.com/nuxt-modules/i18n/issues/3238
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: [
      { code: 'fr', name: 'Français', file: 'fr.ts' },
      { code: 'en', name: 'English', file: 'en.ts' },
    ],
    lazy: true,
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts',
  },
  icon: {
    customCollections: [
      {
        prefix: 'allergens-icons',
        dir: './app/assets/icons/allergens',
      },
    ],
  },
  zodI18n: {
    localeCodesMapping: {
      'en-GB': 'en',
      'fr-FR': 'fr',
    },
  },
});
