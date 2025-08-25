/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E88E5",
        secondary: "#F9A825",
        accent: "#34A853",
        darkbg: "#121212",
        darksurface: "#1E1E1E",
        darktext: "#FFFFFF",
        darkmuted: "#BDBDBD",
      },
      borderRadius: {
        xl: "12px",
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}


