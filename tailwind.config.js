/** @type {import('tailwindcss').Config} */

const { addDynamicIconSelectors } = require('@iconify/tailwind');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      body: ['Wix-Regular', 'sans-serif'],
      bodyBold: ['Wix-Bold', 'sans-serif'],
    },
    extend: {
      colors: {
        'brand-accent': '#ec772d',
      },
    },
  },
  plugins: [
    addDynamicIconSelectors(),
  ],
};
