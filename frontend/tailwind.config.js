/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          dark: "#131921",
          light_dark: "#232F3E",
          yellow: "#FEBD69",
          orange: "#F3A847",
          amber: "#FF9900",
          blue: "#007185",
          prime: "#00A8E1",
          background: "#EAEDED",
          badge: "#CC0C39",
          ai_glow: "#7C3AED",
          ai_cyan: "#06B6D4"
        }
      }
    },
  },
  plugins: [],
};
