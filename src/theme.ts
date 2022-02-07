import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xm: true;
  }
}

export const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  breakpoints: {
    values: {
      xs: 350,
      xm: 500,
      sm: 700,
      md: 1200,
      lg: 1400,
      xl: 1600,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#85a3b7",
      contrastText: "black",
    },
    secondary: {
      main: "#000",
      contrastText: "white",
    },
  },
  spacing: (factor) => `${factor * 0.5}rem`,
});
