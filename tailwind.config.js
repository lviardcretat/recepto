/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
		'./error.vue',
	],
	theme: {
		extend: {
			flexGrow: {
				2: '2',
				3: '3',
				4: '4',
			},
			colors: {
				cool: {
					50: '#f0f7fe',
					100: '#deecfb',
					200: '#c4e0f9',
					300: '#9cccf4',
					400: '#6dafed',
					500: '#4b90e6',
					600: '#3674da',
					700: '#2d60c8',
					800: '#2a4fa3',
					900: '#274481',
					950: '#0f172a',
				},
				green: {
					50: '#edfff7',
					100: '#d5ffee',
					200: '#aeffde',
					300: '#70ffc6',
					400: '#2bfda7',
					500: '#00dc82',
					600: '#00c06d',
					700: '#009658',
					800: '#067549',
					900: '#07603e',
					950: '#003721',
				},
			},
		},
	},
	plugins: [],
};
