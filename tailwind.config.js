/** @type {import('tailwindcss').Config} */
import tailwindcss from "tailwindcss";
import daisyui from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcss,
    daisyui,
  ],
}

