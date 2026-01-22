/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        'primary': '#C8102E', // Rojo de la bandera peruana
        'secondary': '#DAA520', // Dorado peruano
        'accent': '#FFD700', // Oro más brillante
        'light': '#F5F5F5',
        'dark': '#1A1A1A',
        'peru-red': '#C8102E',
        'peru-white': '#FFFFFF',
        'peru-gold': '#DAA520',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'peru-pattern': "url('https://images.unsplash.com/photo-1580130775562-0f9c53463345?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
      }
    },
  },
  plugins: [],
}