/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui"), require('tailwind-scrollbar')({ nocompatible: true })],
  daisyui: {
    themes: ["retro"],
  },
}

