import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF9900',
        brand: {
          DEFAULT: '#FB923C',
          light: '#FFEDD5',
          dark: '#C2410C',
        },
      },
    },
  },
  plugins: [],
}

export default config
