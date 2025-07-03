/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1a1a1a', // Deep authority black
        'primary-foreground': '#ffffff', // white
        
        // Secondary Colors
        'secondary': '#dc2626', // German flag red
        'secondary-foreground': '#ffffff', // white
        
        // Accent Colors
        'accent': '#ea580c', // Energetic orange
        'accent-foreground': '#ffffff', // white
        
        // Background Colors
        'background': '#fafafa', // Warm neutral
        'surface': '#ffffff', // Pure white
        
        // Text Colors
        'text-primary': '#111827', // Near-black
        'text-secondary': '#6b7280', // Professional gray
        
        // Status Colors
        'success': '#059669', // Trustworthy green
        'success-foreground': '#ffffff', // white
        
        'warning': '#d97706', // Attention-grabbing amber
        'warning-foreground': '#ffffff', // white
        
        'error': '#dc2626', // Clear red
        'error-foreground': '#ffffff', // white
        
        // Border Colors
        'border': '#e5e7eb', // Light gray
        'border-accent': '#ea580c', // Energetic orange
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Roboto', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-semibold': '600',
        'heading-bold': '700',
        'body-normal': '400',
        'body-medium': '500',
        'caption-normal': '400',
        'data-normal': '400',
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'elevation-2': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '1000': '1000',
        '1050': '1050',
        '1100': '1100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}