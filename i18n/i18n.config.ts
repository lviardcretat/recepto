export default defineI18nConfig(() => ({
	legacy: false,
	lazy: true,
	strategy: 'prefix_except_default',
	defaultLocale: 'fr',
	langDir: './locales',
	locales: [
		{
			code: 'fr',
			file: 'fr.json',
		},
		{
			code: 'en',
			file: 'en.json',
		},
	],
}));
