/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const colors = require('tailwindcss/colors');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,html}',
    path.resolve(__dirname, './node_modules/litepie-datepicker/**/*.js')
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Change with you want it
        'litepie-primary': colors.purple, // color system for light mode
        'litepie-secondary': colors.gray // color system for dark mode
      }
    }
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      textOpacity: ['disabled'],
      textColor: ['disabled']
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
