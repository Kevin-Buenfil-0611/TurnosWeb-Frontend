/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      'orange': '#FA770F',
      'white': '#FDFEFE'
    }
  },
  darkMode: "class",
  plugins: [nextui()],
}

