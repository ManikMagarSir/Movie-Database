/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          900: '#0A0A0F',
          800: '#12121A',
          700: '#1A1A2E',
          600: '#2A2A3E',
          gold: '#CA8A04',
          'gold-light': '#FBBF24',
          red: '#E11D48',
          'red-light': '#FB7185',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(202, 138, 4, 0.15)',
        'glow-lg': '0 0 30px rgba(202, 138, 4, 0.25)',
        neon: '0 0 6px rgba(202, 138, 4, 0.2), 0 0 20px rgba(202, 138, 4, 0.1), inset 0 0 6px rgba(202, 138, 4, 0.05)',
        'neon-lg': '0 0 10px rgba(202, 138, 4, 0.3), 0 0 40px rgba(202, 138, 4, 0.15), inset 0 0 10px rgba(202, 138, 4, 0.08)',
      },
    },
  },
  plugins: [],
}
