/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FFE600',
        secondary: '#2D3277',
        accent: '#FF6B00',
        surface: '#FFF9CC',
        'text-main': '#111827',
        'text-muted': '#6B7280',
        success: '#4dc438ff',
        // Dark Mode Colors
        dark: {
          bg: '#0F172A', // Deep blue-gray
          surface: '#1a1f2e',
          text: '#F8FAFC',
          muted: '#94A3B8',
          accent: '#FFD700', // Brighter yellow for dark mode contrast
          success: '#4dc438ff',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'yellow': '0 8px 30px rgba(255, 230, 0, 0.35)',
        'yellow-lg': '0 16px 48px rgba(255, 230, 0, 0.5)',
        'card': '0 4px 24px rgba(17, 24, 39, 0.08)',
        'card-hover': '0 16px 48px rgba(17, 24, 39, 0.14)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'scroll': 'scroll 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
