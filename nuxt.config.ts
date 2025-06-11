// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-01-01',
	ssr: true,
	devtools: { enabled: true },
	modules: [
		// Must be loaded before @nuxtjs/i18n
		'nuxt-zod-i18n',
		'@nuxt/image',
		'@nuxtjs/i18n',
		'@nuxt/ui-pro',
		'nuxt-swiper',
		'@nuxthub/core', // Comment it for local bdd
	],
	css: ['~/assets/css/main.css'],
	vue: {
		compilerOptions: {
			isCustomElement: (tag) => tag.includes('swiper-'),
		},
	},
	app: {
		head: {
			htmlAttrs: {
				lang: 'fr',
			},
			title: 'Recepto',
			charset: 'utf-8',
			meta: [],
			link: [],
		},
	},
	i18n: {
		langDir: 'locales',
		defaultLocale: 'fr',
		// https://github.com/nuxt-modules/i18n/issues/3238
		bundle: {
			optimizeTranslationDirective: false,
		},
		locales: [
			{ code: 'fr', file: 'fr.ts' },
			{ code: 'en', file: 'en.ts' },
		],
		lazy: true,
		strategy: 'no_prefix',
		vueI18n: './i18n.config.ts',
	},
	zodI18n: {
		localeCodesMapping: {
			'en-GB': 'en',
			'fr-FR': 'fr',
		},
	},
	hub: {
		// Comment it for local bdd
		database: true,
		blob: true,
	},
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
	$development: {
		// Comment it for local bdd
		hub: {
			remote: true,
		},
	},
});
