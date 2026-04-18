/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        hp: {
          gold: '#c9a84c',
          'gold-light': '#f0d080',
          'gold-dark': '#8a6a1a',
          maroon: '#740001',
          'maroon-light': '#ae0001',
          dark: '#0d0a07',
          darker: '#070503',
          parchment: '#f5e6c8',
          'parchment-dark': '#d4b896',
          stone: '#1a1510',
          'stone-light': '#2a2015',
          smoke: '#3a3025',
          gryffindor: '#740001',
          slytherin: '#1a472a',
          ravenclaw: '#0e1a40',
          hufflepuff: '#ecb939',
        }
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        heading: ['"Cinzel"', 'serif'],
        body: ['"EB Garamond"', 'serif'],
        mono: ['"Special Elite"', 'serif'],
      },
      backgroundImage: {
        'spell-gradient': 'radial-gradient(ellipse at top, #1a0a00 0%, #0d0a07 50%, #070503 100%)',
        'gold-gradient': 'linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1a1510 0%, #0d0a07 100%)',
      },
      animation: {
        'flicker': 'flicker 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'glow': 'glow 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'candle': 'candle 2s ease-in-out infinite alternate',
        'scroll-reveal': 'scrollReveal 0.5s ease forwards',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
          '75%': { opacity: '0.95' },
          '80%': { opacity: '0.6' },
          '82%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(201,168,76,0.3)' },
          '50%': { boxShadow: '0 0 24px rgba(201,168,76,0.7), 0 0 48px rgba(201,168,76,0.2)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        candle: {
          from: { transform: 'scaleX(1) rotate(-1deg)', filter: 'blur(0px)' },
          to: { transform: 'scaleX(0.95) rotate(1deg)', filter: 'blur(0.5px)' },
        },
        scrollReveal: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'gold': '0 0 20px rgba(201,168,76,0.4)',
        'gold-lg': '0 0 40px rgba(201,168,76,0.5), 0 0 80px rgba(201,168,76,0.2)',
        'dark': '0 8px 32px rgba(0,0,0,0.8)',
        'inner-gold': 'inset 0 1px 0 rgba(201,168,76,0.3)',
      },
    },
  },
  plugins: [],
}
