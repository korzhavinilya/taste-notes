'use client';

import { Urbanist } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import Link, { LinkProps } from 'next/link';
import { forwardRef } from 'react';

export const urbanist = Urbanist({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin']
});

const LinkBehavior = forwardRef<HTMLAnchorElement, LinkProps>(
  function LinkBehavior(props, ref) {
    return <Link ref={ref} {...props} />;
  }
);

const theme = createTheme({
  typography: {
    fontFamily: urbanist.style.fontFamily,
    fontSize: 16,
    h1: {
      fontSize: '3.5rem' // 56px
      // fontWeight: 600,
      // lineHeight: 1.25 // 70 / 56
    },
    h2: {
      fontSize: '2.5rem' // 40px
      //   fontWeight: 600,
      //   lineHeight: 1.15 // 46 / 40
    },
    h3: {
      fontSize: '2.0rem' // 32px
      //   fontWeight: 400,
      //   lineHeight: 1.0625 // 34 / 32
    },
    h4: {
      fontSize: '1.5rem' // 24px
      //   fontWeight: 600,
      //   lineHeight: 1.2 // 28.8 / 24
    }
    // h5: {
    //   fontSize: '1.25rem', // 20px
    //   fontWeight: 500,
    //   lineHeight: 1
    // },
    // h6: {
    //   fontSize: '1.25rem', // 20px
    //   fontWeight: 400,
    //   lineHeight: 1.17 // 23.4 / 20
    // },
    // subtitle1: {
    //   fontSize: '1rem', // 16px
    //   fontWeight: 500,
    //   lineHeight: 1.25 // 20 / 16
    // },
    // subtitle2: {
    //   fontSize: '1rem', // 16px
    //   fontWeight: 400,
    //   lineHeight: 1.25 // 20 / 16
    // },
    // body1: {
    //   fontSize: '0.875rem', // 14px
    //   fontWeight: 600,
    //   lineHeight: 1.25 // 17.5 / 14
    // },
    // body2: {
    //   fontSize: '0.875rem', // 14px
    //   fontWeight: 400,
    //   lineHeight: 1.25 // 17.5 / 14
    // },
    // button: {
    //   fontSize: '1rem', // 16px
    //   fontWeight: 500,
    //   lineHeight: 1.25 // 20 / 16
    // }
  },
  palette: {
    custom: {
      main: '#A53D59',
      light: '#EEC57E',
      dark: '#3F2046'
      // contrastText: '#242105'
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    }
  }
});

export default theme;
