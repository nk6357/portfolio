import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './{privacy,cookies,legal}/**/*.html', './src/**/*.{ts,css}'],
  theme: {
    extend: {
      screens: { wide: '1600px' },
      fontFamily: {
        display: ['Lemon Milk Pro', 'Avenir Next', 'Montserrat', 'Arial', 'sans-serif'],
        sans: ['Inter', 'Segoe UI', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config;
