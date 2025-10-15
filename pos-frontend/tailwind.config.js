/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",       // for Vite / main HTML
    "./src/**/*.{js,jsx,ts,tsx}"  // all React components
  ],
  theme: {
    extend: {},
  },
  safelist: [
    'bg-[#f6b100]',
    'bg-[#025cca]',
    'bg-[#be3e3f]',
    'bg-[#02ca3a]',
  ],
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

