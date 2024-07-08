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
        gray: {
          light: '#A1A1A1',
          normal: '#2D2D2D'
        },
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
        surface: {
          'light-active': '#E3E3E3'
        },
        objects: {
          normal: '#9CABC2'
        },
        navigation: {
          bg: '#1E1E1E',
          icon: '#9DB2CE',
          'icon-hover': '#386BF6',
          button: '#613EEA'
        }
      },
      backgroundImage: {
        'home-background': "url('/public-access/home-background.jpg')"
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
export default config;
