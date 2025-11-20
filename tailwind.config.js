/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: '#F5F5DC',
        ocean: '#0052CC',
        aqua: '#00E5FF',
        'al-primary': '#0B59CF',
        'al-accent': '#A020F0',
        'al-primary-soft': '#E3F2FD',
      },
    },
  },
  plugins: [],
}
