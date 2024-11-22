/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/nativewind/**/*.js'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#44b6b65a',
          text: '#333333',
          button: '#5144b65a',
        },
        dark: {
          background: 'rgb(31, 42, 31)',
          text: '#ffffff',
          button: '#ff99006b',
        },
      },
    },
  },
  plugins: [],
};
