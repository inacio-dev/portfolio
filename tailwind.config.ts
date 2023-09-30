import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      colors: {
        brand: {},
        slate: {
          light: {
            1: '#fcfcfd',
            2: '#f9f9fb',
            3: '#f2f2f5',
            4: '#ebebef',
            5: '#e4e4e9',
            6: '#dddde3',
            7: '#d3d4db',
            8: '#b9bbc6',
            9: '#8b8d98',
            10: '#7e808a',
            11: '#60646c',
            12: '#1c2024',
          },
          dark: {
            1: '#18181a',
            2: '#1b1b1f',
            3: '#27282d',
            4: '#2e3035',
            5: '#35373c',
            6: '#3c3f44',
            7: '#464b50',
            8: '#5a6165',
            9: '#696e77',
            10: '#7d828a',
            11: '#adb1b8',
            12: '#edeef0',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
