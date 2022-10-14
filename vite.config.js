import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	resolve: {
		alias: { // also update the .storybook/main.cjs
			// '$lib': path.resolve("./src/lib") // added by default
		}
	}
};

export default config;
