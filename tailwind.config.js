/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'border-blue': '#0F52BA',
      'near-white': '#F1F1F1',
      'color-air': '#EEE',
      'color-cloud': '#DDD',
      'dark-cloud': '#CCC',
      'light-grey': '#BBB',
      'color-black': '#000',
      'dark-night': '#222',
      'dark-grey': '#333',
      'medium-grey': '#555',
      'baby-blue': '#3498db',
      'dark-leather': '#594F4F',
      'error-red': '#FF1111',
      'success-green': '#33CC33',
    },
    extend: {
      screens: {
        'xs': '300px',
        'sm': '400px',
        'md': '500px',
        'lg': '700px',
        'xl': '1023px',
        '2xl': '1600px',
      },
      fontFamily :{ 
        glory: ["roboto","sans-serif"], 
        pop: ["roboto-mono","sans"], 
      }
    },
  },
  plugins: [],
}

