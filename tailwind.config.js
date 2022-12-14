/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,      
      padding: {
        DEFAULT: '10px',
        sm:'10px',
        md:'30px',
        lg:'40px',
        xl:'50px',
        '2xl': '100px',
      },
    },
    extend: {
      colors: {
        'main-gray': '#181f2a',       
      },
    },
  },
  plugins: [],
}