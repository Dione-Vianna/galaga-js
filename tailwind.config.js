/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'arcade': ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        'arcade-yellow': '#FFD700',
        'arcade-cyan': '#00FFFF',
        'arcade-pink': '#FF69B4',
        'arcade-green': '#00FF00',
        'arcade-red': '#FF0000',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'pulse-fast': 'pulse 0.5s ease-in-out infinite',
        'explode': 'explode 0.3s ease-out forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        explode: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
