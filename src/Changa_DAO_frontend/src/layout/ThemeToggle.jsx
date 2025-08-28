import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useAppTheme } from '../theme/ThemeProvider';

const ThemeToggle = () => {
  const { mode, toggleTheme } = useAppTheme();

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        sx={{
          borderRadius: 2,
          transition: 'all 200ms ease',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.04)',
            transform: 'scale(1.05)',
          },
        }}
      >
        {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
