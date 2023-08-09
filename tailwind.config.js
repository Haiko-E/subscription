/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],

  theme: {
    fontFamily: {
      project: ['Roboto', 'ui-sans-serif', 'system-ui'],
    },
    extend: {
      colors: {
        project: {
          100: 'hsl(4, 100%, 67%)',
          200: 'hsl(234, 29%, 20%)',
          300: 'hsl(235, 18%, 26%)',
          400: 'hsl(231, 7%, 60%)',
          500: 'hsl(0, 0%, 100%)',
        },
      },
    },
  },
  plugins: [],
};
