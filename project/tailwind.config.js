/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Lobster', 'cursive'],
        'body': ['"Crimson Text"', 'serif'],
      },
      colors: {
        accent: '#FFD700',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};