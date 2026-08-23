/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050605', // Deep Obsidian
          900: '#080908', // Main Obsidian
          800: '#101211',
          700: '#151716', // Graphite
          600: '#202220', // Charcoal
          500: '#2A2D2A',
        },
        gold: {
          600: '#A3894A',
          500: '#BFA76A', // Antique Gold
          400: '#D9C68F', // Champagne Gold
          300: '#E5D6AE', // Soft Metallic Gold
          200: '#F2E8CD',
          100: '#FAF5E8',
        },
        pearl: {
          900: '#1F1E1B',
          600: '#524F47',
          300: '#D6CFBF',
          200: '#E9E2D5', // Warm Ivory
          100: '#F2EEE5', // Pearl
          50:  '#F7F5F0',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', '"Cinzel"', 'serif'],
        sans: ['"Inter"', '"Manrope"', '"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        'obsidian-glow': '0 0 35px rgba(191, 167, 106, 0.15)',
        'gold-subtle': '0 10px 30px -10px rgba(191, 167, 106, 0.25)',
      }
    },
  },
  plugins: [],
}
