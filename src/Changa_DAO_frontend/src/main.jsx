import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ThemeProvider from "./theme/ThemeProvider";

// Buffer polyfill for DFINITY SDK
import { Buffer } from 'buffer';
if (!window.Buffer) {
  window.Buffer = Buffer;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
