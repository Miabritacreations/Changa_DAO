import { AuthClient } from '@dfinity/auth-client';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from '@mui/material';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    try {
      const client = await AuthClient.create();
      setAuthClient(client);
      
      if (await client.isAuthenticated()) {
        setIsAuthenticated(true);
        const identity = client.getIdentity();
        setPrincipal(identity.getPrincipal().toText());
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    }
  };

  const handleLogin = async () => {
    if (!authClient) return;

    setLoginLoading(true);
    setLoginError(null);

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname.endsWith('.localhost');
    const identityProvider = isLocal ? 'https://identity.ic0.app' : 'https://identity.ic0.app';

    try {
      await authClient.login({
        identityProvider,
        derivationOrigin: window.location.origin,
        windowOpenerFeatures: "left=100,top=100,width=600,height=700",
        onSuccess: async () => {
          setIsAuthenticated(true);
          const identity = authClient.getIdentity();
          setPrincipal(identity.getPrincipal().toText());
          setShowLoginModal(false);
          setLoginLoading(false);
        },
        onError: (err) => {
          console.error('II login error', err);
          setLoginError('Login failed. Please try again.');
          setLoginLoading(false);
        }
      });
    } catch (e) {
      console.error('II login exception', e);
      setLoginError('Login failed. Please try again.');
      setLoginLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setLoginError(null);
  };

  const handleLogout = async () => {
    if (!authClient) return;

    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipal(null);
  };

  const requireAuth = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  const value = {
    isAuthenticated,
    principal,
    handleLogin,
    handleLogout,
    requireAuth,
    showLoginModal,
    setShowLoginModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      
      {/* Login Modal */}
             <Dialog 
         open={showLoginModal} 
         onClose={handleCloseModal}
         maxWidth="sm"
         fullWidth
         disableEscapeKeyDown={false}
         disableBackdropClick={false}
         PaperProps={{
           sx: {
             backgroundColor: '#1E293B',
             border: '1px solid #334155',
             borderRadius: 3,
           }
         }}
       >
        <DialogTitle sx={{ color: 'white', textAlign: 'center', pb: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Welcome to Changa DAO
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8' }}>
            Connect with Internet Identity to access this feature
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          {loginError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {loginError}
            </Alert>
          )}
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
              Internet Identity is a secure authentication system for the Internet Computer blockchain.
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8' }}>
              You'll be redirected to authenticate securely with your identity provider.
            </Typography>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 0 }}>
                     <Button 
             onClick={handleCloseModal}
             variant="outlined"
             sx={{ 
               color: '#94A3B8',
               borderColor: '#94A3B8',
               '&:hover': { 
                 backgroundColor: 'rgba(148, 163, 184, 0.1)',
                 borderColor: '#64748B'
               }
             }}
           >
             Cancel
           </Button>
          <Button
            variant="contained"
            onClick={handleLogin}
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
        </DialogActions>
      </Dialog>
    </AuthContext.Provider>
  );
};
