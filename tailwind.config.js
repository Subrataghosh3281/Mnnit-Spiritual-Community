/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          navy: '#080D1A',
          deep: '#040711',
          card: '#0D1527',
          surface: '#121D36',
          border: '#1E2F52',
          saffron: '#FF6F1E',
          'saffron-light': '#FF8A3D',
          'saffron-dark': '#D94E06',
          gold: '#F59E0B',
          'gold-light': '#FCD34D',
          'gold-dark': '#B45309',
          cream: '#FFFBEB',
          sandal: '#FEF3C7',
          muted: '#94A3B8',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', 'Georgia', 'serif'],
        display: ['"Cinzel Decorative"', '"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        devanagari: ['"Rozha One"', '"Tiro Devanagari Hindi"', 'serif'],
      },
      boxShadow: {
        'divine': '0 0 35px -5px rgba(245, 158, 11, 0.25)',
        'saffron-glow': '0 0 30px -5px rgba(255, 111, 30, 0.35)',
        'inner-gold': 'inset 0 1px 0 0 rgba(253, 211, 77, 0.2)',
      },
      backgroundImage: {
        'mandala-radial': 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08) 0%, rgba(8, 13, 26, 0) 70%)',
        'golden-gradient': 'linear-gradient(135deg, #FF8A3D 0%, #F59E0B 50%, #D97706 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(18, 29, 54, 0.8) 0%, rgba(13, 21, 39, 0.95) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
};
