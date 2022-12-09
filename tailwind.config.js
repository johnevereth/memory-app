/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#FFFCF2",
      lightgray: "#CCC5B9",
      darkgray: "#403D39",
      black: "#252422",
      orange: "#EB5E28",
    },
    extend: {
      fontFamily: {
        abel: ["Abel"],
        creepster: ["Creepster"],
      },
      backgroundImage: {
        "background-pattern": "url('/public/images/background.jpg')",
      },
    },
  },
  plugins: [],
};
