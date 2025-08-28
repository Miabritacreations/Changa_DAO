import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Buffer polyfill for DFINITY SDK
import { Buffer } from 'buffer';
if (!window.Buffer) {
  window.Buffer = Buffer;
}

// Global error handlers to prevent error displays
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  event.preventDefault();
  return false;
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// Centralized theme (can easily add dark mode support later)
const theme = createTheme({
  palette: {
    mode: "light", // Change to "dark" if you want dark mode
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontWeight: 700, fontSize: "2rem" },
    h2: { fontWeight: 600, fontSize: "1.5rem" },
    body1: { fontSize: "1rem" },
  },
});

// Simple app renderer without error display
const renderApp = () => {
  try {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </React.StrictMode>
    );
  } catch (error) {
    // Silently handle errors without displaying them to users
    console.error("App render error:", error);
    
    // Just show a loading state instead of error message
    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = `
        <div style="
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #0F172A;
          color: white;
          font-family: Arial, sans-serif;
        ">
          <div style="text-align: center;">
            <div style="margin-bottom: 16px;">Loading...</div>
            <div style="font-size: 14px; opacity: 0.7;">Please wait while the application loads</div>
          </div>
        </div>
      `;
    }
  }
};

renderApp();
