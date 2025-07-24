import React from "react";
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../public/logo2.svg";

const navItems = [
  { text: "Dashboard", path: "/" },
  { text: "User Profile", path: "/profile" },
  { text: "Voting", path: "/voting" },
  { text: "Proposals", path: "/proposals" },
  { text: "Wallet", path: "/wallet" },
];

const Layout = ({ children }) => (
  <Box sx={{ display: "flex" }}>
    <AppBar position="fixed">
      <Toolbar>
        <img src={logo} alt="ICP Logo" style={{ height: 40, marginRight: 16 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Changa DAO
        </Typography>
      </Toolbar>
    </AppBar>
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
  </Box>
);

export default Layout; 