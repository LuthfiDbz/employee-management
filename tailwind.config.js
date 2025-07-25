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
          100: "#FFFBE5",
          200: "#FFF4B8",
          300: "#FFEC80",
          400: "#FFE44D",
          500: "#FDD000", // acuan utama
          600: "#D6B800",
          700: "#AD9600",
          800: "#857400",
          900: "#5C5200",
          950: "#3F3A00",
        },
        text: "#1E1E1E", // teks utama (gelap)
        dark: "#0F0F10", // dark mode bg
        light: "#E6EEF3", // light mode bg
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
