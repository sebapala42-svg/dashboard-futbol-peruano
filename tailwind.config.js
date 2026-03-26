/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'verde-oscuro': '#0b4026',
        'verde-panel': '#112d1e',
        'verde-lima': '#8cc63f',
      },
    },
  },
  plugins: [],
}
