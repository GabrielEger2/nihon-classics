/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        "primary": "#dc2626",
        "secondary": "#d97706",
        "accent": "#7c3aed",
        "neutral": "#2d1f33",              
        "base-100": "#f3f4f6",
        "info": "#2563eb",
        "success": "#65a30d",
        "warning": "#fac02e",
        "error": "#e11d48",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}