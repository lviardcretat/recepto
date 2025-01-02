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
				supernova: {
					DEFAULT: '#ffcc00',
					50: '#fffee7',
					100: '#fffec1',
					200: '#fff886',
					300: '#ffec41',
					400: '#ffdb0d',
					500: '#ffcc00',
					600: '#d19500',
					700: '#a66a02',
					800: '#89530a',
					900: '#74430f',
					950: '#442304',
				},
				pictonBlue: {
					50: '#eff9ff',
					100: '#def2ff',
					200: '#b6e8ff',
					300: '#75d7ff',
					400: '#2cc4ff',
					500: '#00b2ff',
					600: '#008ad4',
					700: '#006dab',
					800: '#005c8d',
					900: '#064d74',
					950: '#04314d',
				},
				elephant: {
					50: '#f1f9fe',
					100: '#e1f3fd',
					200: '#bde6fa',
					300: '#83d3f6',
					400: '#41bdef',
					500: '#19a5de',
					600: '#0c85bd',
					700: '#0b6a99',
					800: '#0d597f',
					900: '#114b69',
					950: '#0b2f45',
				},
				blueCustom: {
					50: '#f2f0ff',
					100: '#e8e4ff',
					200: '#d3cdff',
					300: '#b3a6ff',
					400: '#8f73ff',
					500: '#6d3bff',
					600: '#5d14ff',
					700: '#4d00ff',
					800: '#4101d6',
					900: '#3703af',
					950: '#1f0077',
				},
			},
		},
	},
	plugins: [],
};

// colors :
// primary : #092435
// secondary : #0B2F45
// tertiary : #1BAC9A
