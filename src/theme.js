// File: src/theme.js
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFC107", // Professional gold/amber
      contrastText: "#000000",
    },
    secondary: {
      main: "#616161", // Dark gray for accents
    },
    background: {
      default: "#F6F6F6", // Light gray screen background
      paper: "#FFFFFF", // White for cards and surfaces
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        },
      },
    },
  },
});
