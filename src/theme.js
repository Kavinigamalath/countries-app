import { createTheme } from "@mui/material/styles"; // import MUI’s theme creation function

// Create a custom Material-UI theme to override default design tokens
const theme = createTheme({
  palette: {
    primary:   { main: "#1976d2" },   // deep blue for primary actions
    secondary: { main: "#f50057" },   // pink accent for secondary actions
    common:    { main: "#AFDDFF" },   // custom common color (light blue)
  },
  typography: {
    fontFamily: "'Inter', sans-serif", // set global font stack to Inter
  },
  components: {
    // Override default styles for Card components
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,            // round card corners with 16px radius
        },
      },
    },
    // Override default styles for Button components
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",       // disable automatic uppercase on button text
          borderRadius: 8,             // give buttons an 8px corner radius
        },
      },
    },
  },
});

export default theme; // Export the theme to wrap your app in a ThemeProvider
