/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#423a1c', // Dark gold
          dark: '#2a2511',
          light: '#5a4f27',
        },
        secondary: {
          DEFAULT: '#ceb56c', // Light gold
          dark: '#b59b57',
          light: '#e7cf81',
        },
        accent: {
          DEFAULT: '#ceb56c', // Gold
        },
        success: {
          DEFAULT: '#423a1c',
        },
        warning: {
          DEFAULT: '#ceb56c',
        },
        error: {
          DEFAULT: '#D32F2F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};