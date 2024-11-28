/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        8: "repeat(8,minmax(0, 1fr))",
        9: "repeat(9,minmax(0, 1fr))",
        10: "repeat(10,minmax(0, 1fr))",
        11: "repeat(11,minmax(0, 1fr))",
        12: "repeat(12,minmax(0, 1fr))",
        13: "repeat(13,minmax(0, 1fr))",
        14: "repeat(14,minmax(0, 1fr))",
        15: "repeat(15,minmax(0, 1fr))",
      },
      colors: {
        customGreen: "rgba(43, 195, 141, 0.2)",
        customYellow: "rgb(229, 172, 26, 0.2)",
        customRed: "rgb(199, 50, 49, 0.2)",
      },
    },
  },
  plugins: [],
};
