/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#F7F3EC",
        walnut: "#241A14",
        saddle: "#8B4513",
        brass: "#C9A15A",
        fretboard: "#2E2A26",
        rust: "#B23B2E",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};