

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16A0DB', // Prime Life brand blue
      secondary: '#FFCC00', // Accent (e.g., yellow/gold),
        accent: '#f7f7f9',
        brown: '#94654f',
        'brown-light': '#b78866',
        'brown-lighter': '#cfa895',
        'brown-lightest': '#dcc1ab',
        gray: '#9ca3aa',
        'gray-light': '#c9d1d7'
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'reey': ['Reey', 'cursive']
      }
    },
  },
  plugins: [],
}