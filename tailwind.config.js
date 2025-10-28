/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf7ff',
          100: '#f3edff',
          200: '#e9deff',
          300: '#d6c1ff',
          400: '#b995ff',
          500: '#B57EDC', // Primary Lavender
          600: '#9f5ed6',
          700: '#8a4bc2',
          800: '#6f3a9e',
          900: '#5c3280',
        },
        secondary: {
          50: '#f0fcff',
          100: '#e0f9ff',
          200: '#baf3ff',
          300: '#7eeaff',
          400: '#B0E0E6', // Secondary Powder Blue
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          peach: '#FFB07C', // Warm Peach
          coral: '#FF6F61', // Soft Coral
          honey: '#FFC857', // Golden Honey
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      }
    },
  },
  plugins: [],
}