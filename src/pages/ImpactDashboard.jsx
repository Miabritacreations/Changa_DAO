import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as TreasuryIcon,
  CheckCircle as CheckIcon,
  FilterList as FilterIcon,
  Public as MapIcon,
  EmojiEvents as BadgeIcon,
} from "@mui/icons-material";

const ImpactDashboard = () => {
  const theme = useTheme();
  const [categoryFilter, setCategoryFilter] = useState("all");

  const stats = [
    {
      title: "People Impacted",
      value: "89,432",
      subtitle: "Lives changed",
      icon: <PeopleIcon />,
      color: "#4caf50",
    },
    {
      title: "Money Disbursed",
      value: "$2.4M",
      subtitle: "Total funding",
      icon: <TreasuryIcon />,
      color: "#2196f3",
    },
    {
      title: "Verified Milestones",
      value: "1,247",
      subtitle: "Completed goals",
      icon: <CheckIcon />,
      color: "#ff9800",
    },
    {
      title: "Active Projects",
      value: "156",
      subtitle: "Currently running",
      icon: <TrendingUpIcon />,
      color: "#9c27b0",
    },
  ];

  const projects = [
    {
      id: 1,
      name: "Kisumu Water Project",
      location: "Kisumu, Kenya",
      category: "Water",
      peopleImpacted: 2500,
      funding: 50000,
      status: "completed",
      coordinates: { lat: -0.1022, lng: 34.7617 },
    },
    {
      id: 2,
      name: "Solar Power Initiative",
      location: "Mombasa, Kenya",
      category: "Energy",
      peopleImpacted: 800,
      funding: 75000,
      status: "active",
      coordinates: { lat: -4.0435, lng: 39.6682 },
    },
    {
      id: 3,
      name: "Mobile Health Clinic",
      location: "Nairobi, Kenya",
      category: "Health",
      peopleImpacted: 15000,
      funding: 100000,
      status: "active",
      coordinates: { lat: -1.2921, lng: 36.8219 },
    },
  ];

  const nftBadges = [
    {
      id: 1,
      name: "Water Guardian",
      description: "You helped build this school",
      project: "Kisumu Water Project",
      rarity: "rare",
      image: "https://via.placeholder.com/100x100/2196f3/ffffff?text=WG",
    },
    {
      id: 2,
      name: "Energy Pioneer",
      description: "Solar power champion",
      project: "Solar Power Initiative",
      rarity: "epic",
      image: "https://via.placeholder.com/100x100/ff9800/ffffff?text=EP",
    },
    {
      id: 3,
      name: "Health Hero",
      description: "Mobile clinic supporter",
      project: "Mobile Health Clinic",
      rarity: "legendary",
      image: "https://via.placeholder.com/100x100/f44336/ffffff?text=HH",
    },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "water", label: "Water" },
    { value: "energy", label: "Energy" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "agriculture", label: "Agriculture" },
    { value: "environment", label: "Environment" },
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "#9e9e9e";
      case "rare":
        return "#2196f3";
      case "epic":
        return "#9c27b0";
      case "legendary":
        return "#ff9800";
      default:
        return "#9e9e9e";
    }
  };

  const filteredProjects = projects.filter((project) => {
    return categoryFilter === "all" || project.category.toLowerCase() === categoryFilter;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          Impact Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
          See the real difference we're making together through decentralized impact investing
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={6}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
                border: `1px solid ${stat.color}30`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 20px 40px ${stat.color}20`,
                },
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}80 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    color: "white",
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography variant="h3" component="div" sx={{ fontWeight: "bold", color: stat.color, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {stat.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Interactive Map Section */}
      <Card sx={{ mb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Global Impact Map
            </Typography>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filter by Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Filter by Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
                startAdornment={<FilterIcon sx={{ mr: 1 }} />}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Map Placeholder */}
          <Box
            sx={{
              height: 400,
              background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <MapIcon sx={{ fontSize: 80, color: "rgba(0,0,0,0.3)" }} />
            <Typography variant="h6" color="text.secondary" sx={{ position: "absolute", bottom: 20 }}>
              Interactive map showing {filteredProjects.length} funded projects worldwide
            </Typography>

            {/* Project Markers */}
            {filteredProjects.map((project, index) => (
              <Box
                key={project.id}
                sx={{
                  position: "absolute",
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index * 10)}%`,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: project.status === "completed" ? "#4caf50" : "#ff9800",
                  border: "3px solid white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>

          {/* Project List */}
          <Box mt={3}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Featured Projects
            </Typography>
            <Grid container spacing={2}>
              {filteredProjects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <Card sx={{ p: 2 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: project.status === "completed" ? "#4caf50" : "#ff9800" }}>
                        <LocationIcon />
                      </Avatar>
                      <Box flex={1}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {project.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {project.location}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {project.peopleImpacted.toLocaleString()} people impacted
                        </Typography>
                      </Box>
                      <Chip
                        label={project.status}
                        size="small"
                        color={project.status === "completed" ? "success" : "warning"}
                      />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* NFT Badges Showcase */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <BadgeIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Your Impact Badges
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Collect NFTs that represent your contributions to impactful projects around the world
          </Typography>

          <Grid container spacing={3}>
            {nftBadges.map((badge) => (
              <Grid item xs={12} sm={6} md={4} key={badge.id}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: "center",
                    background: `linear-gradient(135deg, ${getRarityColor(badge.rarity)}15 0%, ${getRarityColor(badge.rarity)}05 100%)`,
                    border: `2px solid ${getRarityColor(badge.rarity)}30`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 20px 40px ${getRarityColor(badge.rarity)}20`,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 2,
                      background: `linear-gradient(135deg, ${getRarityColor(badge.rarity)} 0%, ${getRarityColor(badge.rarity)}80 100%)`,
                      fontSize: "1.5rem",
                    }}
                  >
                    {badge.name.split(" ").map(word => word[0]).join("")}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {badge.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {badge.description}
                  </Typography>
                  <Chip
                    label={badge.rarity}
                    size="small"
                    sx={{
                      background: `linear-gradient(135deg, ${getRarityColor(badge.rarity)} 0%, ${getRarityColor(badge.rarity)}80 100%)`,
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                  <Typography variant="caption" display="block" sx={{ mt: 1, color: "text.secondary" }}>
                    {badge.project}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={4}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<BadgeIcon />}
              sx={{ borderRadius: 2, px: 4 }}
            >
              View All Badges
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ImpactDashboard;
