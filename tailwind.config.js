/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "650px",
        md: "940px",
      },
      fontFamily: {
        mynerve: ["Mynerve", "sans-serif"],
      },
    },
  },
  plugins: [],
};
