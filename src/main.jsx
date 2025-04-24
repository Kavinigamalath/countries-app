import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./styles/index.css"; // Tailwind CSS utilities

// Find the root DOM node and initialize a React root for concurrent rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // Provide the Material UI theme to all child components
  <ThemeProvider theme={theme}>
    {/* Enable client-side routing throughout the app */}
    <BrowserRouter>
      {/* Your top-level App component containing all routes and layout */}
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
