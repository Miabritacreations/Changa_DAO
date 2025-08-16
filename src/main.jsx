import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

// Add error handling for the entire app
const renderApp = () => {
  try {
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to render app:', error);
    // Show a simple error message
    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; text-align: center; font-family: Arial, sans-serif;">
          <h2 style="color: #d32f2f; margin-bottom: 16px;">Application Error</h2>
          <p style="color: #666; margin-bottom: 24px;">We encountered an error while loading the application. Please try refreshing the page.</p>
          <button onclick="window.location.reload()" style="padding: 12px 24px; background: #1976d2; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
            Reload Page
          </button>
        </div>
      `;
    }
  }
};

renderApp();
