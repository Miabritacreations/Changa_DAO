import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "/logo2.svg";
import internetIdentityService from "../services/internetIdentity";

const navItems = [
  { text: "Dashboard", path: "/" },
  { text: "User Profile", path: "/profile" },
  { text: "Voting", path: "/voting" },
  { text: "Proposals", path: "/proposals" },
  { text: "Wallet", path: "/wallet" },
];

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPrincipal, setUserPrincipal] = useState(null);

  useEffect(() => {
    // Check authentication status on mount
    const authStatus = internetIdentityService.getAuthStatus();
    setIsAuthenticated(authStatus.authenticated);
    setUserPrincipal(authStatus.principal);
  }, []);

  const handleLogout = async () => {
    await internetIdentityService.logout();
    setIsAuthenticated(false);
    setUserPrincipal(null);
  };

  const handleLogin = async () => {
    const result = await internetIdentityService.authenticate();
    if (result.success) {
      setIsAuthenticated(true);
      setUserPrincipal(result.principal);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <img src={logo} alt="ICP Logo" style={{ height: 40, marginRight: 16 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Changa DAO
          </Typography>
          
          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {userPrincipal?.toString().slice(0, 10)}...
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      
      {isAuthenticated ? (
        <>
          <Drawer variant="permanent" sx={{ width: 200, [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box' } }}>
            <Toolbar />
            <List>
              {navItems.map((item) => (
                <ListItem button key={item.text} component={Link} to={item.path}>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 25, mt: 8 }}>
            {children}
          </Box>
        </>
      ) : (
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Box textAlign="center" mt={8}>
            <Typography variant="h4" gutterBottom>
              Welcome to Changa DAO
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Please login with Internet Identity to access the DAO
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={handleLogin}
              sx={{ mt: 2 }}
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