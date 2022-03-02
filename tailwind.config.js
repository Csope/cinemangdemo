module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/common/**/*.{js,ts,jsx,tsx}',
		'./src/modules/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		fontFamily: {
			montserrat: ['Montserrat', 'sans-serif'],
			roboto: ['Roboto', 'sans-serif'],
		},
		container: {
			center: true,
			screens: {
				sm: '100%',
				md: '100%',
				lg: '960px',
				xl: '	1140px',
			},
		},
		extend: {
			colors: {
				'site-1': '#e3d5ec',
				'site-2': '#bc9acc',
				'site-3': '#9467a8',
				'site-4': '#680b65',
				'site-5': '#f8f3f9',
				'site-6': '#c8acd5',
				'site-7': '#d5bddf',
				'site-8': '#ac86bf',
				'site-9': '#ad7db7',
				'site-10': '#d3e6ea',
				'site-11': '#028d9a',
				'site-12': '#ebe0ce',
				'site-13': '#353849',
				'site-14': '#515763',
				'site-15': '#3a3939',
				'site-16': '#92def7',
			},
		},
	},
	plugins: [],
};
