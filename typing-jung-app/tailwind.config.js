/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom theme colors will be injected via CSS variables
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        text: {
          DEFAULT: 'var(--color-text)',
          correct: 'var(--color-text-correct)',
          incorrect: 'var(--color-text-incorrect)',
          untyped: 'var(--color-text-untyped)',
        },
        caret: 'var(--color-caret)',
        accent: 'var(--color-accent)',
      },
      backgroundColor: {
        'text-incorrect': 'var(--color-text-incorrect)',
        'text-correct': 'var(--color-text-correct)',
      },
      textDecorationColor: {
        'text-incorrect': 'var(--color-text-incorrect)',
        'text-correct': 'var(--color-text-correct)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
        sans: ['Crimson Pro', 'EB Garamond', 'Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['Crimson Pro', 'EB Garamond', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
      animation: {
        'blink': 'blink 1s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.3s ease-in',
        'slideUp': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
