/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|text|border|ring|hover:bg|focus:border|focus:ring)-(blue|purple|green|rose|amber)-(50|100|400|500|600|700)/,
    },
  ],
  plugins: [],
};