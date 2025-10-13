import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFC107",
      contrastText: "#000000",
    },
    secondary: {
      main: "#212121",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#212121",
      secondary: "#616161",
    },
    error: {
      main: "#D32F2F",
    },
    success: {
      main: "#388E3C",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: {
      fontWeight: 700,
      color: "#000000",
    },
    h5: {
      fontWeight: 700,
      color: "#000000",
    },
    h6: {
      fontWeight: 600,
      color: "#000000",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid #E0E0E0",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontWeight: 600,
          textTransform: "none",
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#FFA000",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F5F5F5",
          "& .MuiTableCell-root": {
            fontWeight: 700,
            color: "#000000",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});
