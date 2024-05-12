/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        'gray-primary': '#dedede36',
        'gray-second': '#42424236',
        'card-main': '#1b2539',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

