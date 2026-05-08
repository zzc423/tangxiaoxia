import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2A6F6A',
          dark: '#1D4D47',
          light: '#3D8F87',
        },
        accent: {
          DEFAULT: '#D87C49',
          light: '#E89B6E',
        },
        background: '#FAF8F5',
        surface: '#FFFFFF',
        'text-primary': '#1E293B',
        'text-secondary': '#64748B',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', 'Noto Sans SC', 'sans-serif'],
        heading: ['var(--font-figtree)', 'Figtree', 'sans-serif'],
      },
      fontSize: {
        'body': ['1rem', { lineHeight: '1.75' }], // 16px with 1.75 line-height
        'small': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'touch': '44px', // minimum touch target
      },
    },
  },
  plugins: [],
}
export default config
