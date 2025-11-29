// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // Must be loaded before @nuxtjs/i18n
    // 'nuxt-zod-i18n',
    '@nuxt/image', '@nuxtjs/i18n', '@nuxt/ui', '@nuxthub/core', '@nuxt/eslint', 'nuxt-auth-utils'],
  $development: {
    // DB : Comment it for local db
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
    // DB : Comment it for local db
    database: true,
    blob: true,
  },
  vite: {
    ssr: {
      noExternal: ['to-px'],
    },
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
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    lazy: true,
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  icon: {
    customCollections: [
      {
        prefix: 'allergens-icons',
        dir: './app/assets/icons/allergens',
      },
    ],
  },
  /*
  zodI18n: {
    localeCodesMapping: {
      'en-GB': 'en',
      'fr-FR': 'fr',
    },
  }, */
});
