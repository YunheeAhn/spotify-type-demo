import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1ed760",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#000",
      paper: "#121212",
    },
    text: {
      primary: "#fff",
      secondary: "#b3b3b3",
    },
    action: {
      hover: "#282828",
      active: "#333",
    },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    h2: {
      fontSize: "1.2rem",
    },
    body1: {
      fontSize: "1rem",
    },
    subtitle1: {
      fontSize: "0.889rem",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 680,
      md: 980,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          textTransform: "none",
        },
        containedSecondary: {
          backgroundColor: "#ffffff",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        },
        sizeLarge: {
          padding: "8px 32px",
          fontWeight: 700,
          fontSize: "16px",
        },
      },
    },
  },
});

export default theme;
