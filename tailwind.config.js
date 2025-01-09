/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        "20px": "20px",
      },
      colors: {
        customBlue: "#2d313a",
      },
    },
  },

  plugins: [],
};
