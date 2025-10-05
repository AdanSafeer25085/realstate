/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#FFD93D',
        'brand-dark-blue': '#134686',
        'brand-white': '#FFFFFF',
        'brand-light-gray': '#F8F9FA',
        'text-primary': '#2C3E50',
        'text-secondary': '#7F8C8D',
        'border-light': '#E5E5E5',
      },
      fontFamily: {
        'business': ['Times New Roman', 'serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
        },
      },
    },
  },
  plugins: [],
}