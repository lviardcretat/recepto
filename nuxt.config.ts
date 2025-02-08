// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	ssr: true,
	devtools: { enabled: true },
	extends: ['@nuxt/ui-pro'],
	modules: [
		'@nuxt/image',
		'@pinia/nuxt',
		'@prisma/nuxt',
		'@nuxt/ui',
		'nuxt-swiper',
		'@nuxtjs/i18n',
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
});
