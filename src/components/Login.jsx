import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import internetIdentityService from '../services/internetIdentity';

const Login = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = internetIdentityService.getAuthStatus();
    setIsAuthenticated(authStatus.authenticated);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await internetIdentityService.authenticate();
      
      if (result.success) {
        setIsAuthenticated(true);
        if (onLoginSuccess) {
          onLoginSuccess(result);
        }
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to Internet Identity. Please check your connection.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await internetIdentityService.logout();
      setIsAuthenticated(false);
      if (onLoginSuccess) {
        onLoginSuccess({ success: false });
      }
    } catch (err) {
      setError('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    const principal = internetIdentityService.getUserPrincipal();
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="h6" gutterBottom>
          Welcome to Changa DAO!
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Principal: {principal?.toString() || 'Unknown'}
        </Typography>
        <Button 
          variant="outlined" 
          onClick={handleLogout}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={20} /> : 'Logout'}
        </Button>
      </Box>
    );
  }

  return (
    <Box textAlign="center" p={3}>
      <Typography variant="h4" gutterBottom>
        Welcome to Changa DAO
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Connect with Internet Identity to access the DAO
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button 
        variant="contained" 
        size="large"
        onClick={handleLogin}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Connecting...
          </>
        ) : (
          'Login with Internet Identity'
        )}
      </Button>
    </Box>
  );
};

export default Login; 