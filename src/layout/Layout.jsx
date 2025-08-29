import {
    Dashboard as DashboardIcon,
    Home as HomeIcon,
    Menu as MenuIcon,
    Person as ProfileIcon,
    Business as ProjectsIcon,
    HowToVote as ProposalsIcon,
    HowToVote as VoteIcon,
    AccountBalanceWallet as WalletIcon
} from "@mui/icons-material";
import {
    AppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useAppTheme } from "../theme/ThemeProvider";

const Shell = () => {
  const { isAuthenticated, principal, handleLogout, setShowLoginModal } = useAuth();
  const { mode } = useAppTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigationItems = [
    { path: '/', label: 'Home', icon: <HomeIcon />, public: true },
    { path: '/dashboard', label: 'Overview', icon: <DashboardIcon />, public: true },
    { path: '/projects', label: 'Projects', icon: <ProjectsIcon />, public: true },
    { path: '/proposals', label: 'Proposals', icon: <ProposalsIcon />, public: true },
    { path: '/wallet', label: 'Wallet', icon: <WalletIcon />, public: false },
    { path: '/voting', label: 'Voting', icon: <VoteIcon />, public: false },
    { path: '/profile', label: 'Profile', icon: <ProfileIcon />, public: false },
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.public || isAuthenticated
  );

  const handleNavClick = (item) => {
    console.log('Navigation clicked:', item.path, 'Authenticated:', isAuthenticated, 'Public:', item.public);
    if (!item.public && !isAuthenticated) {
      // Show login modal for protected pages
      setShowLoginModal(true);
      return;
    }
    // Navigation will be handled by React Router Link
    console.log('Navigating to:', item.path);
  };

  const drawerContent = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {navigationItems.map((item) => {
          const isAccessible = item.public || isAuthenticated;
          const isSelected = location.pathname === item.path;
          
          return (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={() => handleNavClick(item)}
              selected={isSelected}
              sx={{
                mx: 1,
                borderRadius: 2,
                mb: 0.5,
                cursor: 'pointer',
                opacity: 1,
                transition: 'all 0.2s ease',
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: '#1E40AF',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#1E3A8A',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: isSelected ? 'white' : '#b0b0b0',
                minWidth: 40 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                secondary={undefined}
                primaryTypographyProps={{
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? 'white' : 'white',
                }}
                secondaryTypographyProps={{
                  color: '#b0b0b0',
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0F172A' }}>
      {/* Desktop Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { md: 280 },
          flexShrink: { md: 0 },
          display: { xs: 'none', md: 'block' },
          backgroundColor: '#1E293B',
          borderRight: '1px solid #334155',
        }}
      >
        <Box
          sx={{
            width: { md: 280 },
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            backgroundColor: '#1E293B',
            borderRight: '1px solid #334155',
            overflowY: 'auto',
            zIndex: 1200,
          }}
        >
          {/* Logo */}
          <Box sx={{ p: 3, borderBottom: '1px solid #334155' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
              Changa DAO
            </Typography>
          </Box>
          
          {drawerContent}
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            backgroundColor: '#1E293B',
            borderRight: '1px solid #334155',
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 3, borderBottom: '1px solid #334155' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
            Changa DAO
          </Typography>
        </Box>
        
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - 280px)` },
          backgroundColor: '#0F172A',
        }}
      >
        {/* Header */}
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{
            backgroundColor: '#1E293B',
            borderBottom: '1px solid #334155',
            backdropFilter: 'none',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setSidebarOpen(true)}
                sx={{ mr: 2, display: { md: 'none' }, color: 'white' }}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
                    mr: 2,
                  }}
                />
                <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: 'white' }}>
                  Changa DAO
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {isAuthenticated && (
                  <>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: { xs: 'none', md: 'block' },
                        color: '#94A3B8',
                        fontFamily: 'monospace'
                      }}
                    >
                      {principal?.slice(0, 8)}...{principal?.slice(-8)}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleLogout}
                      size="small"
                      sx={{
                        borderColor: '#f44336',
                        color: '#f44336',
                        '&:hover': {
                          borderColor: '#d32f2f',
                          backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        },
                      }}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Page Content */}
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Shell; 
