import React from 'react';
import { Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Login = ({ onLoginSuccess }) => {
  const { isAuthenticated, principal, handleLogin, handleLogout, loginLoading, loginError } = useAuth();

  const handleLoginClick = async () => {
    try {
      await handleLogin();
      if (onLoginSuccess) {
        onLoginSuccess({ success: true, principal });
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      if (onLoginSuccess) {
        onLoginSuccess({ success: false });
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (isAuthenticated) {
    return (
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
          Connected with Internet Identity
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: '#94A3B8', fontFamily: 'monospace' }}>
          {principal?.slice(0, 8)}...{principal?.slice(-8)}
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogoutClick}
          sx={{
            borderColor: '#f44336',
            color: '#f44336',
            '&:hover': {
              borderColor: '#d32f2f',
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
            },
          }}
        >
          Disconnect
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      {loginError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {loginError}
        </Alert>
      )}
      
      <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
        Connect with Internet Identity
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 3, color: '#94A3B8' }}>
        Internet Identity is a secure authentication system for the Internet Computer blockchain.
      </Typography>
      
      <Button
        variant="contained"
        onClick={handleLoginClick}
        disabled={loginLoading}
        sx={{
          background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1E3A8A, #1E40AF)',
          },
          '&:disabled': {
            background: '#334155',
            color: '#64748B',
          },
        }}
      >
        {loginLoading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Connecting...
          </>
        ) : (
          'Connect Internet Identity'
        )}
      </Button>
    </Box>
  );
};

export default Login; 