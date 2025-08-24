import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Assignment as ProposalsIcon,
  HowToVote as VoteIcon,
  AccountBalance as WalletIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Projects", icon: <ProposalsIcon />, path: "/projects" },
    { text: "Voting", icon: <VoteIcon />, path: "/voting" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile" },
    { text: "Treasury", icon: <WalletIcon />, path: "/treasury" },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#111827",
          color: "#fff",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 700 }}
          >
            Changa DAO
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            background: "#1f2937",
            color: "#fff",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={toggleDrawer}
              sx={{
                borderRadius: "12px",
                mx: 1,
                my: 0.5,
                "&:hover": {
                  background: "#374151",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#9ca3af" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f9fafb",
          p: 3,
          mt: 8,
          overflowY: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
