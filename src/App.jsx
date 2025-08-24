import { Box, Button, Container, CssBaseline, Switch, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Projects from "./pages/Projects"; // <-- Import Projects

function Home() {
  return (
    <Box>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
        Changa DAO
      </Typography>
      <Typography variant="h5" gutterBottom>
        Welcome to Changa DAO!
      </Typography>
      <Typography>
        Building transparent, community-driven projects with blockchain.
      </Typography>
    </Box>
  );
}

function About() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        About Us
      </Typography>
      <Typography>
        Changa DAO is a blockchain-powered crowdfunding platform that helps communities bring real-world social projects to life. From schools and boreholes to health clinics, we enable communities to raise funds transparently, track progress with geo-tagged proof, and release funds milestone by milestone.
      </Typography>
      <Typography mt={1}>
        By combining decentralized governance with investor incentives, Changa DAO ensures that every contribution—whether a donation or an investment—creates measurable, lasting impact.
      </Typography>
    </Box>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#667eea",
      },
      secondary: {
        main: "#764ba2",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1d1d1d" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "Arial, sans-serif",
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="md" sx={{ py: 4 }}>
          {/* Dark/Light Mode Switch */}
          <Box display="flex" justifyContent="flex-end" mb={3}>
            <Typography mr={1}>{darkMode ? "Dark Mode" : "Light Mode"}</Typography>
            <Switch checked={darkMode} onChange={toggleDarkMode} />
          </Box>

          {/* Navigation */}
          <Box mb={4} display="flex" gap={2}>
            <Button component={Link} to="/" variant="outlined" color="primary">
              Home
            </Button>
            <Button component={Link} to="/about" variant="outlined" color="primary">
              About
            </Button>
            <Button component={Link} to="/projects" variant="outlined" color="primary">
              Projects
            </Button>
          </Box>

          {/* Page Content */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} /> {/* <-- Add Projects route */}
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;