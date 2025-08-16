import React, { useState, useEffect } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Box, 
  Button, 
  Avatar,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Badge
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  HowToVote as VoteIcon,
  Assignment as ProposalsIcon,
  AccountBalance as WalletIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon
} from "@mui/icons-material";
import logo from "/logo2.svg";
import internetIdentityService from "../services/internetIdentity";

const navItems = [
  { text: "Home", path: "/", icon: <DashboardIcon /> },
  { text: "Explore Projects", path: "/projects", icon: <AssignmentIcon /> },
  { text: "Impact Dashboard", path: "/impact", icon: <TrendingUpIcon /> },
  { text: "Governance", path: "/governance", icon: <VoteIcon /> },
  { text: "Investor Dashboard", path: "/investor", icon: <WalletIcon /> },
  { text: "About", path: "/about", icon: <PersonIcon /> },
];

const authenticatedNavItems = [
  { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { text: "User Profile", path: "/profile", icon: <PersonIcon /> },
  { text: "Voting", path: "/voting", icon: <VoteIcon /> },
  { text: "Proposals", path: "/proposals", icon: <ProposalsIcon /> },
  { text: "Wallet", path: "/wallet", icon: <WalletIcon /> },
];

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPrincipal, setUserPrincipal] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Check authentication status on mount
    try {
      const authStatus = internetIdentityService.getAuthStatus();
      setIsAuthenticated(authStatus.authenticated);
      setUserPrincipal(authStatus.principal);
    } catch (error) {
      console.warn('Authentication check failed, using default state:', error);
      setIsAuthenticated(false);
      setUserPrincipal(null);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await internetIdentityService.logout();
      setIsAuthenticated(false);
      setUserPrincipal(null);
    } catch (error) {
      console.warn('Logout failed:', error);
      // Force logout even if service fails
      setIsAuthenticated(false);
      setUserPrincipal(null);
    }
  };

  const handleLogin = async () => {
    try {
      const result = await internetIdentityService.authenticate();
      if (result.success) {
        setIsAuthenticated(true);
        setUserPrincipal(result.principal);
      }
    } catch (error) {
      console.warn('Login failed:', error);
      // For demo purposes, allow mock login
      setIsAuthenticated(true);
      setUserPrincipal({ toString: () => 'demo-user-123' });
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={2}>
            <img src={logo} alt="Changa DAO" style={{ height: 40, width: 'auto' }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Changa DAO
            </Typography>
          </Box>
          
          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Tooltip title="Notifications">
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <Chip
                label={`${userPrincipal?.toString().slice(0, 8)}...`}
                variant="outlined"
                size="small"
                sx={{ 
                  fontWeight: 500,
                  borderColor: 'primary.main',
                  color: 'primary.main'
                }}
              />
              
              <Tooltip title="Logout">
                <IconButton 
                  onClick={handleLogout}
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': { color: 'error.main' }
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Button 
              variant="contained" 
              startIcon={<LoginIcon />}
              onClick={handleLogin}
              sx={{ 
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                px: 3
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      
      {isAuthenticated ? (
        <>
          <Drawer 
            variant="permanent" 
            sx={{ 
              width: 280, 
              [`& .MuiDrawer-paper`]: { 
                width: 280, 
                boxSizing: 'border-box',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRight: '1px solid rgba(0, 0, 0, 0.08)'
              } 
            }}
          >
            <Toolbar />
            <Box sx={{ p: 2 }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'text.secondary',
                  letterSpacing: 1
                }}
              >
                Navigation
              </Typography>
            </Box>
            <Divider sx={{ mx: 2 }} />
            <List sx={{ px: 2, py: 1 }}>
              {(isAuthenticated ? authenticatedNavItems : navItems).map((item) => (
                <ListItem 
                  button 
                  key={item.text} 
                  component={Link} 
                  to={item.path}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    backgroundColor: isActiveRoute(item.path) ? 'primary.main' : 'transparent',
                    color: isActiveRoute(item.path) ? 'white' : 'text.primary',
                    '&:hover': {
                      backgroundColor: isActiveRoute(item.path) ? 'primary.dark' : 'rgba(0, 0, 0, 0.04)',
                      transform: 'translateX(4px)'
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: isActiveRoute(item.path) ? 'white' : 'text.secondary',
                    minWidth: 40
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontWeight: isActiveRoute(item.path) ? 600 : 500 
                    }}
                  />
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ mt: 'auto', p: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Changa DAO v1.0
                </Typography>
              </Box>
            </Box>
          </Drawer>
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              p: 3, 
              ml: '280px', 
              mt: 8,
              background: 'transparent'
            }}
          >
            {children}
          </Box>
        </>
      ) : (
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            mt: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 64px)'
          }}
        >
          <Box 
            textAlign="center" 
            sx={{ 
              maxWidth: 500,
              p: 4,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            <img 
              src={logo} 
              alt="Changa DAO" 
              style={{ 
                height: 80, 
                width: 'auto', 
                marginBottom: 24,
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
              }} 
            />
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Welcome to Changa DAO
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.6 }}
            >
              Join our decentralized community and participate in governance decisions. 
              Login with Internet Identity to access the DAO.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              startIcon={<LoginIcon />}
              onClick={handleLogin}
              sx={{ 
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              Login with Internet Identity
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Layout; 