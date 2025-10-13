// File: src/theme.js
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFC107", // Government yellow
      light: "#FFF176",
      dark: "#F57F17",
      contrastText: "#000000",
    },
    secondary: {
      main: "#000000", // Black for secondary elements
      light: "#424242",
      dark: "#000000",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF", // Pure white background
      paper: "#FFFFFF", // White cards
    },
    text: {
      primary: "#000000", // Black text
      secondary: "#424242", // Dark gray text
    },
    divider: "#E0E0E0", // Light gray dividers
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.4,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      fontSize: "0.875rem",
      textTransform: "none",
      letterSpacing: "0.02em",
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.4,
    },
    overline: {
      fontWeight: 600,
      fontSize: "0.75rem",
      lineHeight: 1.4,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    },
  },
  shape: {
    borderRadius: 8, // Consistent border radius
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0,0,0,0.1)",
    "0px 4px 8px rgba(0,0,0,0.1)",
    "0px 6px 12px rgba(0,0,0,0.1)",
    "0px 8px 16px rgba(0,0,0,0.1)",
    "0px 10px 20px rgba(0,0,0,0.1)",
    "0px 12px 24px rgba(0,0,0,0.1)",
    "0px 14px 28px rgba(0,0,0,0.1)",
    "0px 16px 32px rgba(0,0,0,0.1)",
    "0px 18px 36px rgba(0,0,0,0.1)",
    "0px 20px 40px rgba(0,0,0,0.1)",
    "0px 22px 44px rgba(0,0,0,0.1)",
    "0px 24px 48px rgba(0,0,0,0.1)",
    "0px 26px 52px rgba(0,0,0,0.1)",
    "0px 28px 56px rgba(0,0,0,0.1)",
    "0px 30px 60px rgba(0,0,0,0.1)",
    "0px 32px 64px rgba(0,0,0,0.1)",
    "0px 34px 68px rgba(0,0,0,0.1)",
    "0px 36px 72px rgba(0,0,0,0.1)",
    "0px 38px 76px rgba(0,0,0,0.1)",
    "0px 40px 80px rgba(0,0,0,0.1)",
    "0px 42px 84px rgba(0,0,0,0.1)",
    "0px 44px 88px rgba(0,0,0,0.1)",
    "0px 46px 92px rgba(0,0,0,0.1)",
    "0px 48px 96px rgba(0,0,0,0.1)",
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#FFFFFF",
          color: "#000000",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid #E0E0E0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
          },
        },
        contained: {
          backgroundColor: "#FFC107",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#F57F17",
          },
        },
        outlined: {
          borderColor: "#000000",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#F5F5F5",
            borderColor: "#000000",
          },
        },
        text: {
          color: "#000000",
          "&:hover": {
            backgroundColor: "#F5F5F5",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "#FFFFFF",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          border: "1px solid #E0E0E0",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: "#FFC107",
          color: "#000000",
        },
        outlined: {
          borderColor: "#E0E0E0",
          color: "#000000",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "& fieldset": {
              borderColor: "#E0E0E0",
            },
            "&:hover fieldset": {
              borderColor: "#FFC107",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FFC107",
            },
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F5F5F5",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: "#000000",
          borderBottom: "2px solid #E0E0E0",
        },
        body: {
          borderBottom: "1px solid #E0E0E0",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#E0E0E0",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFC107",
          color: "#000000",
          fontWeight: 600,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#F5F5F5",
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFC107",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#F57F17",
          },
        },
      },
    },
  },
});
