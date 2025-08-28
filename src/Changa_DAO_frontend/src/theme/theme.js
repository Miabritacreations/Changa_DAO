import { createTheme } from '@mui/material/styles';

// Crowdfunding-focused color palette: Trust + Energy + Inspiration
const lightColors = {
  primary: {
    main: '#1E40AF', // Navy Blue - Trust & Professionalism
    light: '#3B82F6', // Royal Blue - Accessible & Friendly
    dark: '#1E3A8A', // Dark Navy - Authority & Security
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#059669', // Emerald Green - Growth & Success
    light: '#10B981', // Light Green - Progress & Achievement
    dark: '#047857', // Dark Green - Stability & Reliability
    contrastText: '#FFFFFF',
  },
  accent: {
    orange: '#F97316', // Orange - Energy & Call-to-Action
    yellow: '#EAB308', // Yellow - Optimism & Encouragement
    teal: '#0D9488', // Teal - Modern & Fresh
    purple: '#7C3AED', // Purple - Creativity & Innovation
    green: '#10B981', // Green - Growth & Success
    red: '#EF4444', // Red - Urgency & Attention
  },
  background: {
    default: '#F8FAFC', // Clean White - Minimalist & Focus
    paper: '#FFFFFF', // Pure White - Clean & Professional
    subtle: '#F1F5F9', // Light Gray - Subtle Background
    glass: 'rgba(255,255,255,0.08)',
  },
  text: {
    primary: '#0F172A', // Dark Charcoal - Readable & Professional
    secondary: '#475569', // Medium Gray - Balanced & Accessible
    muted: '#64748B', // Light Gray - Subtle & Non-intrusive
  },
  border: {
    light: '#E2E8F0', // Light Border - Subtle Separation
    medium: '#CBD5E1', // Medium Border - Clear Definition
  },
  success: {
    main: '#10B981', // Green - Success & Achievement
    light: '#34D399', // Light Green - Positive Feedback
  },
  error: {
    main: '#EF4444', // Red - Error & Attention
    light: '#F87171', // Light Red - Warning & Alert
  },
  warning: {
    main: '#F59E0B', // Amber - Warning & Caution
    light: '#FBBF24', // Light Amber - Gentle Warning
  },
  info: {
    main: '#3B82F6', // Blue - Information & Trust
    light: '#60A5FA', // Light Blue - Friendly Info
  },
  // Crowdfunding-specific colors
  crowdfunding: {
    progress: '#10B981', // Green for progress bars
    goal: '#059669', // Darker green for funding goals
    remaining: '#64748B', // Gray for remaining targets
    cta: '#F97316', // Orange for call-to-action buttons
    trust: '#1E40AF', // Navy for trust indicators
    energy: '#EAB308', // Yellow for energy and optimism
  },
};

const darkColors = {
  primary: {
    main: '#3B82F6', // Royal Blue - Trust & Professionalism (lighter for dark mode)
    light: '#60A5FA', // Light Blue - Accessible & Friendly
    dark: '#1E40AF', // Navy Blue - Authority & Security
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#10B981', // Emerald Green - Growth & Success
    light: '#34D399', // Light Green - Progress & Achievement
    dark: '#059669', // Dark Green - Stability & Reliability
    contrastText: '#FFFFFF',
  },
  accent: {
    orange: '#F97316', // Orange - Energy & Call-to-Action
    yellow: '#EAB308', // Yellow - Optimism & Encouragement
    teal: '#0D9488', // Teal - Modern & Fresh
    purple: '#7C3AED', // Purple - Creativity & Innovation
    green: '#10B981', // Green - Growth & Success
    red: '#EF4444', // Red - Urgency & Attention
  },
  background: {
    default: '#0F172A', // Dark Charcoal - Professional & Focused
    paper: '#1E293B', // Dark Slate - Clean & Modern
    subtle: '#334155', // Dark Gray - Subtle Background
    glass: 'rgba(255,255,255,0.08)',
  },
  text: {
    primary: '#F8FAFC', // Light Gray - Readable & Professional
    secondary: '#CBD5E1', // Medium Gray - Balanced & Accessible
    muted: '#94A3B8', // Light Gray - Subtle & Non-intrusive
  },
  border: {
    light: '#475569', // Medium Border - Subtle Separation
    medium: '#64748B', // Light Border - Clear Definition
  },
  success: {
    main: '#10B981', // Green - Success & Achievement
    light: '#34D399', // Light Green - Positive Feedback
  },
  error: {
    main: '#EF4444', // Red - Error & Attention
    light: '#F87171', // Light Red - Warning & Alert
  },
  warning: {
    main: '#F59E0B', // Amber - Warning & Caution
    light: '#FBBF24', // Light Amber - Gentle Warning
  },
  info: {
    main: '#3B82F6', // Blue - Information & Trust
    light: '#60A5FA', // Light Blue - Friendly Info
  },
  // Crowdfunding-specific colors for dark mode
  crowdfunding: {
    progress: '#10B981', // Green for progress bars
    goal: '#059669', // Darker green for funding goals
    remaining: '#64748B', // Gray for remaining targets
    cta: '#F97316', // Orange for call-to-action buttons
    trust: '#3B82F6', // Blue for trust indicators (lighter for dark mode)
    energy: '#EAB308', // Yellow for energy and optimism
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
  // Crowdfunding-specific component styles
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        backgroundColor: 'rgba(100, 116, 139, 0.2)',
      },
      bar: {
        borderRadius: 8,
        background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
      },
    },
  },
  MuiCircularProgress: {
    styleOverrides: {
      root: {
        color: '#10B981',
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
