/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensures Tailwind scans all JS/TS/JSX/TSX files in src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};