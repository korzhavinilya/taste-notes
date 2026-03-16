import '@material-ui/core/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: Palette['primary'];
  }

  interface PaletteOptions {
    custom?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}

// declare module '@material-ui/core/styles/createPalette' {
//   interface Palette {
//     custom: Palette['primary'];
//   }
//   interface PaletteOptions {
//     custom?: PaletteOptions['primary'];
//   }
// }
