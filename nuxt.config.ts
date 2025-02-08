// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	ssr: true,
	devtools: { enabled: true },
	build: {
		transpile: ['@prisma/client'],
	},
	extends: ['@nuxt/ui-pro'],
	modules: [
		'@nuxt/image',
		'@nuxt/ui',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'@prisma/nuxt',
		'nuxt-swiper',
		'@nuxthub/core',
		'nuxt-zod-i18n',
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
	prisma: {
		installStudio: true,
		autoSetupPrisma: true,
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
});
