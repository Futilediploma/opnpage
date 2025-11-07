/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F25C05',
          'orange-dark': '#F37C2D',
          navy: '#0F2233',
          'navy-dark': '#0C141A',
          beige: '#F8F5F2',
          gray: '#E6E3DF',
          'gray-dark': '#1C2732',
          'text-dark': '#F8F5F2',
        },
        'brand-navy-dark': '#0C141A',
        'brand-navy': '#0F2233',
        'brand-beige': '#F8F5F2',
        'brand-gray': '#E6E3DF',
        'brand-gray-dark': '#1C2732',
        'brand-orange': '#F25C05',
        'brand-orange-dark': '#F37C2D',
        'brand-text-dark': '#F8F5F2',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        '8': '0.5rem',
        '16': '1rem',
        '24': '1.5rem',
        '32': '2rem',
        '40': '2.5rem',
        '48': '3rem',
        '64': '4rem',
        '80': '5rem',
        '96': '6rem',
        '128': '8rem',
      },
      lineHeight: {
        'relaxed': '1.7',
        'loose': '1.85',
      },
      borderRadius: {
        'sm': '0.375rem',
        'DEFAULT': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(15, 34, 51, 0.06)',
        'card': '0 4px 16px rgba(15, 34, 51, 0.08)',
        'lifted': '0 8px 24px rgba(15, 34, 51, 0.12)',
        'dark-subtle': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'dark-card': '0 4px 16px rgba(0, 0, 0, 0.4)',
        'dark-lifted': '0 8px 24px rgba(0, 0, 0, 0.5)',
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke',
      },
    },
  },
  plugins: [],
}
