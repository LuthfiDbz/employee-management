/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F3F4F6", // sangat terang
          200: "#D8DDE2",
          300: "#B4BDC6",
          400: "#8897A4",
          500: "#5D6D7C", // acuan utama
          600: "#475766",
          700: "#364350",
          800: "#252F39",
          900: "#151D22",
          950: "#0B0F13", // sangat gelap
        },
        secondary: {
          100: "#",
          200: "#",
          300: "#",
          400: "#",
          500: "#FDD000",
          600: "#",
          700: "#",
          800: "#",
          900: "#",
          950: "#",
        },
        text: "#",
        dark: "#0F0F10",
        light: "#E6EEF3",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
