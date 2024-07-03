import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // '01': '#C67C4E',
        // '02': '#EDD6C8',
        // '03': '#313131',
        // '04': '#E3E3E3',
        // '05': '#F9F2ED'
        brown: {
          light: '#F9F2ED',
          normal: '#C67C4E',
          'normal-hover': '#B27046'
        },
        grey: {
          light: '#A2A2A2',
          'normal-active': '#830F0F'
        },
        surface: {
          'light-active': '#E3E3E3'
        }
      },
      backgroundImage: {
        'home-background': "url('/home-background.jpg')"
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
export default config;
