import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },    // deep blue
    secondary: { main: "#f50057" },  // pink accent
    common: { main: "#AFDDFF" },  // light blue
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
