import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./theme/dark.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#4f8bf9" },
    background: {
      default: "#0b0f14",
      paper: "#0f1720",
    },
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: `'Inter', -apple-system, 'Segoe UI', Roboto, Arial, sans-serif` },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
