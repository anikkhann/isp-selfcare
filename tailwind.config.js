/** @type {import('tailwindcss').Config} */

module.exports = {
  // important: true,
  corePlugins: {
    preflight: false
  },

  important: true,

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        hind_Siliguri: ["Hind Siliguri", "sans-serif"],
        Barlow: ["Barlow", "sans-serif"]
      }
    },
    colors: {
      primary: "#EE5921",
      secondary: "#2DB48B",
      accent: "#67CBA0",
      violet: "#883677",
      neutral: "#4B6BFB",
      "base-100": "#FFFFFF",
      info: "#3ABFF8",
      success: "#36D399",
      warning: "#FBBD23",
      danger: "#FF5630",
      error: "#F87272",
      dark: "#181A2A",
      light: "#F9FBFC",
      black: "#2E3A44",
      white: "#FFFFFF",
      grey1: "#A0AABF",
      grey2: "#C0C6D4",
      grey3: "#E3E8F1"
    }
  },
  plugins: []
};
