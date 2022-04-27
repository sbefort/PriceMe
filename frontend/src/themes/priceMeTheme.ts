import { createTheme } from '@mui/material/styles';

import { babyBlue, charcoal, babyBlueDarken, grey, white } from './colors';

const defaultFont = 'Roboto, Helvetica, Arial, sans-serif';

const priceMeTheme = createTheme({
  // Overide individual component default styles
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '3rem',
          fontWeight: 900,
        },
        h2: {
          fontSize: '2rem',
          fontWeight: 700,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: 5,
        },
        containedPrimary: {
          backgroundColor: babyBlue,
          color: charcoal,
          '&:hover, &:active': {
            backgroundColor: babyBlueDarken,
            color: white,
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: 10,
          marginBottom: 10,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: grey,
        },
      },
    },
  },
  typography: {
    allVariants: {
      color: charcoal,
    },
    fontFamily: defaultFont,
  },
});

export default priceMeTheme;
