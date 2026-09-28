/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#F3F6F3',
        surface: '#FFFFFF',
        line: '#DCE6DE',
        ink: '#16302B',
        'ink-soft': '#5C7268',
        income: '#2D8C7F',
        expense: '#E2635A',
        highlight: '#E8B94A',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
