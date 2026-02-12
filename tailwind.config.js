/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#e67e51", // Village Roof Orange
        secondary: "#fbc687", // Sand Yellow
        success: "#f2cc0d", // Golden Yellow
        warm: "#ffedcc", // Light Sand
        earth: "#78350f", // Dark Wood
        "field-green": "#6db14b", // Grass Green
        "background-light": "#ffedcc",
        "background-dark": "#1c190d",
        "pixel-dark": "#1c190d",
      },
      fontFamily: {
        display: ["'VT323'", "monospace"],
        retro: ["'VT323'", "monospace"],
        pixel: ["'Press Start 2P'", "cursive"]
      },
      borderRadius: {
        DEFAULT: "4px",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
