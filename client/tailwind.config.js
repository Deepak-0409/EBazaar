/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        black: {
          950: '#1a1d24',
          1000: '#030301',
        },
      }
    },
  },
  plugins: [],
}
