/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "primary-dark": "var(--background-primary-dark)",
        "primary-default": "var(--background-primary-default)",
        "primary-light": "var(--background-primary-light)",
        "primary-lighter": "var(--background-primary-lighter)",
        "primary-lightest": "var(--background-primary-lightest)",
        "highlight-dark": "var(--color-highlight-dark)",
        "highlight-default": "var(--color-highlight-default)",
        "subtle": "var(--text-subtle)",
        "dark": "var(--text-dark)",
        "default": "var(--text-default)",
        "light": "var(--text-light)",
      }
    },
  },
  plugins: [],
}
