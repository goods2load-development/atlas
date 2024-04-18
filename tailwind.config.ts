import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './_components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'laptop': '1440px',
      },
      fontFamily: {
        'poppins': ['Poppins'],
      },
      colors: {
        primaryOrange: '#FF6720',
        customWhite: '#FFFFFF',
        black: '#29292A'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('../assets/hero-pattern.svg')",
        'divide-pattern': "url('../assets/divide-pattern.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
