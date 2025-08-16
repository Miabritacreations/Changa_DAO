import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  Stack,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  PlayArrow as PlayIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as TreasuryIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowIcon,
  Fund as FundIcon,
  Launch as LaunchIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, icon, color, subtitle }) => (
  <Card
    sx={{
      height: "100%",
      background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
      border: `1px solid ${color}30`,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: `0 20px 40px ${color}20`,
      },
    }}
  >
    <CardContent sx={{ textAlign: "center", p: 3 }}>
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
          color: "white",
        }}
      >
        {icon}
      </Box>
      <Typography variant="h3" component="div" sx={{ fontWeight: "bold", color: color, mb: 1 }}>
        {value}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const FeatureCard = ({ title, description, icon, color }) => (
  <Card
    sx={{
      height: "100%",
      p: 3,
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.1)",
      },
    }}
  >
    <Box
      sx={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 2,
        color: "white",
      }}
    >
      {icon}
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
      {description}
    </Typography>
  </Card>
);

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    {
      title: "Total Funds Raised",
      value: "$2.4M",
      subtitle: "Across all projects",
      icon: <TreasuryIcon />,
      color: "#4caf50",
    },
    {
      title: "Projects Completed",
      value: "156",
      subtitle: "Successfully funded",
      icon: <CheckIcon />,
      color: "#2196f3",
    },
    {
      title: "Active Investors",
      value: "12.5K",
      subtitle: "Community members",
      icon: <PeopleIcon />,
      color: "#ff9800",
    },
    {
      title: "People Impacted",
      value: "89K",
      subtitle: "Lives changed",
      icon: <TrendingUpIcon />,
      color: "#9c27b0",
    },
  ];

  const features = [
    {
      title: "Transparent Funding",
      description: "Every transaction is recorded on the blockchain, ensuring complete transparency and accountability.",
      icon: <CheckIcon />,
      color: "#4caf50",
    },
    {
      title: "Community Governance",
      description: "DAO members vote on project proposals, ensuring community-driven decision making.",
      icon: <PeopleIcon />,
      color: "#2196f3",
    },
    {
      title: "Impact Tracking",
      description: "Real-time updates and milestone tracking for all funded projects.",
      icon: <TrendingUpIcon />,
      color: "#ff9800",
    },
    {
      title: "Global Reach",
      description: "Fund projects worldwide with our decentralized platform.",
      icon: <LocationIcon />,
      color: "#9c27b0",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 16 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  lineHeight: 1.2,
                  mb: 3,
                }}
              >
                Invest in Impact.
                <br />
                Earn with Purpose.
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                Join the future of impact investing. Fund real-world projects through our
                decentralized autonomous organization and earn returns while making a difference.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mb: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<FundIcon />}
                  component={Link}
                  to="/projects"
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.3)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Fund a Project Today
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<LaunchIcon />}
                  component={Link}
                  to="/about"
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    color: "white",
                    "&:hover": {
                      borderColor: "white",
                      background: "rgba(255, 255, 255, 0.1)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Launch a Project
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: 400,
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <IconButton
                    size="large"
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    sx={{
                      color: "white",
                      background: "rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.3)",
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <PlayIcon sx={{ fontSize: 60 }} />
                  </IconButton>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    background: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    fontSize: "0.875rem",
                  }}
                >
                  How Changa DAO works in 60 seconds
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Our Impact in Numbers
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            See the real difference we're making together through decentralized impact investing
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Why Choose Changa DAO?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Experience the future of impact investing with our innovative platform
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FeatureCard {...feature} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Paper
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 3 }}
          >
            Ready to Make a Difference?
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.9 }}
          >
            Join thousands of investors who are already funding impactful projects
            and earning returns while changing lives.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<FundIcon />}
              component={Link}
              to="/projects"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.3)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Fund a Project
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<LaunchIcon />}
              component={Link}
              to="/about"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                borderColor: "rgba(255, 255, 255, 0.5)",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  background: "rgba(255, 255, 255, 0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Launch a Project
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage;
