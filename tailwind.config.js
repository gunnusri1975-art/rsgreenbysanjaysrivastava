/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1E4634',
          deep: '#12261D',
          rich: '#265942',
          light: '#2E6B4F',
        },
        leaf: {
          DEFAULT: '#1E6B47',
          soft: '#278257',
          mist: '#EEF4F0',
        },
        ivory: {
          DEFAULT: '#FFFFFF',
          warm: '#F7F8F6',
          cream: '#F1F3F0',
          border: '#E2E6E1',
        },
        charcoal: {
          DEFAULT: '#161B18',
          muted: '#555E59',
        },
        gold: {
          DEFAULT: '#B08D57',
          dark: '#8C6D3F',
          soft: '#D1B380',
          pale: '#F3ECE0',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 16px -4px rgba(18, 38, 29, 0.06)',
        elevated: '0 20px 44px -16px rgba(18, 38, 29, 0.16)',
      },
    },
  },
  plugins: [],
};
