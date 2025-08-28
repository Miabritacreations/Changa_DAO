import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext({ mode: 'light', toggleTheme: () => {} });

export const useAppTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('changa-theme');
    return saved || 'light';
  });

  useEffect(() => {
    localStorage.setItem('changa-theme', mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const theme = useMemo(() => {
    return mode === 'light' ? lightTheme : darkTheme;
  }, [mode]);

  const value = useMemo(() => ({
    mode,
    toggleTheme: () => setMode(m => m === 'light' ? 'dark' : 'light'),
  }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
