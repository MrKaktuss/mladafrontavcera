import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
			  "inter": ['Inter', ...defaultTheme.fontFamily.sans],
			  "noto-sans": ['Noto Sans', ...defaultTheme.fontFamily.sans],
			  "montserrat": ['Montserrat', ...defaultTheme.fontFamily.sans]
			},
		  },
	},
	plugins: [],
}
