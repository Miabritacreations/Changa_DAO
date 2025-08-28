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

// Error boundary fallback renderer
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
    console.error("⚠️ Failed to render app:", error);

    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          text-align: center;
          font-family: Arial, sans-serif;
        ">
          <h2 style="color: #d32f2f; margin-bottom: 16px;">Application Error</h2>
          <p style="color: #666; margin-bottom: 24px;">
            We encountered an error while loading the application.<br/>
            Please try refreshing the page.
          </p>
          <button onclick="window.location.reload()" style="
            padding: 12px 24px;
            background: #1976d2;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
          ">
            🔄 Reload Page
          </button>
        </div>
      `;
    }
  }
};

renderApp();
