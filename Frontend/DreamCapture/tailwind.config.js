/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./src/**/*.{html,js,jsx,ts,tsx}",
  "./src/components/**/*.{html,js,jsx,ts,tsx}"
  ],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        varela: ['"Varela Round"', "sans-serif"],
      },
      colors: {
        "light-bg": "#F0F8FF",
        "dark-bg": "#3c3c3c",
        "light-text": "#000000",
        "dark-text": "#ffffff",
        "light-primary": "#22d3ee", // Cyan
        "dark-primary": "#14b8a6", // Teal
      },
    },
  },
  plugins: [],
}

