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
});
