import { createTheme } from '@mui/material/styles';

// Color palettes based on Stripe/Linear integration with blockchain touches
const lightColors = {
  primary: {
    main: '#1E88E5',
    light: '#42A5F5',
    dark: '#1565C0',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#F9A825',
    light: '#FFD54F',
    dark: '#F57F17',
    contrastText: '#FFFFFF',
  },
  accent: {
    green: '#00E676',
    red: '#FF5252',
    cyan: '#00B8D9',
    purple: '#7C4DFF',
  },
  background: {
    default: '#F5F7FA',
    paper: '#FFFFFF',
    glass: 'rgba(255,255,255,0.08)',
  },
  text: {
    primary: '#1C1C1C',
    secondary: '#4F4F4F',
    muted: '#6B7280',
  },
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
  },
  success: {
    main: '#00E676',
    light: '#4CAF50',
  },
  error: {
    main: '#FF5252',
    light: '#F44336',
  },
  warning: {
    main: '#FF9800',
    light: '#FFB74D',
  },
  info: {
    main: '#2196F3',
    light: '#64B5F6',
  },
};

const darkColors = {
  primary: {
    main: '#42A5F5',
    light: '#64B5F6',
    dark: '#1976D2',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FFD54F',
    light: '#FFE082',
    dark: '#FFA000',
    contrastText: '#000000',
  },
  accent: {
    green: '#00E676',
    red: '#FF5252',
    cyan: '#00B8D9',
    purple: '#7C4DFF',
  },
  background: {
    default: '#121212',
    paper: '#1E1E1E',
    glass: 'rgba(255,255,255,0.08)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#BDBDBD',
    muted: '#9CA3AF',
  },
  border: {
    light: '#374151',
    medium: '#4B5563',
  },
  success: {
    main: '#00E676',
    light: '#4CAF50',
  },
  error: {
    main: '#FF5252',
    light: '#F44336',
  },
  warning: {
    main: '#FF9800',
    light: '#FFB74D',
  },
  info: {
    main: '#2196F3',
    light: '#64B5F6',
  },
};

// Typography configuration
const typography = {
  fontFamily: [
    'Poppins',
    'Inter', 
    'Montserrat',
    'system-ui',
    'Arial',
    'sans-serif'
  ].join(', '),
  h1: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
  },
  h2: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: '2rem',
    lineHeight: 1.3,
  },
  h3: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.4,
  },
  h4: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.4,
  },
  h5: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.4,
  },
  body1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  body2: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
  button: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '0.875rem',
    textTransform: 'none',
  },
  caption: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 500,
    fontSize: '0.75rem',
    lineHeight: 1.4,
  },
  overline: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
};

// Component overrides for consistent styling
const componentOverrides = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        textTransform: 'none',
        fontWeight: 600,
        padding: '10px 24px',
        transition: 'all 200ms ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
      },
      contained: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        },
      },
      outlined: {
        borderWidth: 2,
        '&:hover': {
          borderWidth: 2,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'all 250ms ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        backgroundImage: 'none',
      },
      elevation1: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      },
      elevation2: {
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 12,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0,0,0,0.2)',
          },
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255,255,255,0.8)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: '0 16px 16px 0',
        border: 'none',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 600,
        fontSize: '0.75rem',
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        '&:before': {
          display: 'none',
        },
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 44,
        height: 24,
        padding: 0,
      },
      switchBase: {
        padding: 2,
        '&.Mui-checked': {
          transform: 'translateX(20px)',
        },
      },
      thumb: {
        width: 20,
        height: 20,
      },
      track: {
        borderRadius: 12,
        opacity: 1,
      },
    },
  },
};

// Create light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...lightColors,
  },
  typography,
  shape: {
    borderRadius: 12,
  },
  components: componentOverrides,
});

// Create dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...darkColors,
  },
  typography,
  shape: {
    borderRadius: 12,
  },
  components: componentOverrides,
});
