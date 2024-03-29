/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],

  theme: {
    extend: {},
    screens: {
      xl: { max: '1279px' }, // => @media (max-width: 1279px) { ... }
      lg: { max: '900px' }, // => @media (max-width: 900px) { ... }
      md: { max: '768px' }, // => @media (max-width: 768px) { ... }
      sm: { max: '640px' }, // => @media (max-width: 640px) { ... }
      xs: { max: '440px' } // => @media (max-width: 440px) { ... }
    }
  },
  plugins: [nextui()]
})
