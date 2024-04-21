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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

