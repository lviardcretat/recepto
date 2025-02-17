// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	ssr: true,
	devtools: { enabled: true },
	extends: ['@nuxt/ui-pro'],
	modules: [
		// Must be loaded before @nuxtjs/i18nssssssssssssssssssssssssssssssssssssss
		'nuxt-zod-i18n',
		'@nuxt/image',
		'@nuxt/ui',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'nuxt-swiper',
		'@nuxthub/core',
	],
	css: ['~/assets/css/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
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
		locales: [
			{ code: 'fr', file: 'fr.ts' },
			{ code: 'en', file: 'en.ts' },
		],
		lazy: true,
		strategy: 'no_prefix',
		vueI18n: './i18n/i18n.config.ts',
	},
	zodI18n: {
		localeCodesMapping: {
			'en-GB': 'en',
			'fr-FR': 'fr',
		},
	},
	hub: {
		database: true,
		blob: true,
	},
	nitro: {
		experimental: {
			tasks: true,
			openAPI: true,
		},
	},
	$development: {
		hub: {
			remote: true,
		},
	},
});
