const { sveltePreprocess } = require("svelte-preprocess/dist/autoProcess");
const { path } = require("path");
const { mergeConfig } = require("vite");

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-svelte-csf"
  ],
  "framework": "@storybook/svelte",
  // "svelteOptions": {
  //   "preprocess": import("../svelte.config.js").preprocess
  // },
  svelteOptions: {
    preprocess: sveltePreprocess({
      babel: {
        presets: [
          [
            '@babel/preset-env',
            {
              loose: true,
              modules: false,
              targets: {
                esmodules: true,
              },
            },
          ],
        ],
      },
    }),
  },

  core: {
    builder: "@storybook/builder-vite"
  },

  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      // customize the Vite config here, also update vite.config.js
      resolve: {
        alias: { $lib: '/src/lib' },
      },
    });
  },

  // "features": {
  //   "storyStoreV7": true
  // }
}