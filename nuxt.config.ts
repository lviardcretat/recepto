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
		'@nuxt/fonts',
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
	fonts: {
		families: [
			// specify specific font data - this will bypass any providers
			{
				name: 'bnequipt',
				src: '~/assets/fonts/BNEquipt.otf',
				weight: 'bold',
			},
		],
	},
});
