/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fafaf8',
          100: '#f5f3f0',
          200: '#ede8e0',
          300: '#e6ddd2',
          400: '#ddd0c4',
          500: '#d4c4b0',
          600: '#cbb89c',
          700: '#b89c82',
          800: '#9d8270',
          900: '#7a6558',
        },
        forest: {
          50: '#c7f5dd',
          100: '#b3e1c9',
          200: '#9fcda5',
          300: '#8bb9a1',
          400: '#77a58d',
          500: '#639279',
          600: '#4f7561',
          700: '#3b5849',
          800: '#273b31',
          900: '#131d19',
        },
        amber: {
          50: '#fffbf0',
          100: '#fff6dc',
          200: '#ffecb3',
          300: '#ffe082',
          400: '#ffd54f',
          500: '#ffca28',
          600: '#ffb300',
          700: '#ff9800',
          800: '#f57c00',
          900: '#e65100',
        },
        primary: {
          50: '#fafaf8',
          100: '#f5f3f0',
          200: '#ede8e0',
          300: '#e6ddd2',
          400: '#ddd0c4',
          500: '#d4c4b0',
          600: '#cbb89c',
          700: '#2d6a50',
          800: '#1a3f2e',
          900: '#08150d',
          950: '#04080a',
        },
        accent: {
          50: '#fffbf0',
          100: '#fff6dc',
          200: '#ffecb3',
          300: '#ffe082',
          400: '#ffd54f',
          500: '#ffca28',
          600: '#ffb300',
          700: '#ff9800',
          800: '#f57c00',
          900: '#e65100',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards',
        'fade-out-down': 'fadeOutDown 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards',
        'scale-down-fade': 'scaleDownFade 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, 40px, 0)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
        },
        fadeOutDown: {
          '0%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translate3d(0, 40px, 0)',
          },
        },
        scaleDownFade: {
          '0%': {
            opacity: '1',
            transform: 'scale3d(1, 1, 1)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale3d(0.95, 0.95, 1)',
          },
        },
      },
      transitionTimingFunction: {
        quintic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      },
      backdropBlur: {
        md: '12px',
      },
    },
  },
  important: '#root',
  plugins: [],
}
