import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  LinearProgress,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckIcon,
  Construction as ConstructionIcon,
  Schedule as ScheduleIcon,
  Fund as FundIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const getMilestoneIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckIcon sx={{ color: "#4caf50" }} />;
      case "in-progress":
        return <ConstructionIcon sx={{ color: "#ff9800" }} />;
      case "pending":
        return <ScheduleIcon sx={{ color: "#9e9e9e" }} />;
      default:
        return <ScheduleIcon sx={{ color: "#9e9e9e" }} />;
    }
  };

  const getMilestoneColor = (status) => {
    switch (status) {
      case "completed":
        return "#4caf50";
      case "in-progress":
        return "#ff9800";
      case "pending":
        return "#9e9e9e";
      default:
        return "#9e9e9e";
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        },
        border: "1px solid rgba(0, 0, 0, 0.08)",
        borderRadius: 3,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={project.image || "https://via.placeholder.com/400x200/667eea/ffffff?text=Project+Image"}
        alt={project.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <LocationIcon sx={{ color: "text.secondary", fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary">
            {project.location}
          </Typography>
          <Chip
            label={project.category}
            size="small"
            sx={{
              ml: "auto",
              background: `linear-gradient(135deg, ${project.categoryColor} 0%, ${project.categoryColor}80 100%)`,
              color: "white",
              fontWeight: 600,
            }}
          />
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, lineHeight: 1.3 }}>
          {project.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
          {project.description}
        </Typography>

        {/* Funding Progress */}
        <Box mb={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Funding Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.fundingProgress}% funded
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={project.fundingProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              background: "rgba(0, 0, 0, 0.1)",
              "& .MuiLinearProgress-bar": {
                background: `linear-gradient(90deg, ${project.categoryColor} 0%, ${project.categoryColor}80 100%)`,
                borderRadius: 4,
              },
            }}
          />
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="caption" color="text.secondary">
              ${project.raised.toLocaleString()} raised
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ${project.goal.toLocaleString()} goal
            </Typography>
          </Box>
        </Box>

        {/* Milestone Tracker */}
        <Box mb={3}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
            Milestones
          </Typography>
          <Stack spacing={1}>
            {project.milestones.map((milestone, index) => (
              <Box key={index} display="flex" alignItems="center" gap={1}>
                {getMilestoneIcon(milestone.status)}
                <Typography
                  variant="body2"
                  sx={{
                    color: getMilestoneColor(milestone.status),
                    fontWeight: milestone.status === "completed" ? 600 : 400,
                  }}
                >
                  {milestone.name}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Team Info */}
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar sx={{ width: 32, height: 32 }}>
            <PeopleIcon />
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {project.team}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {project.teamSize} members
            </Typography>
          </Box>
        </Box>

        {/* Fund Now Button */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<FundIcon />}
          component={Link}
          to={`/projects/${project.id}`}
          sx={{
            borderRadius: 2,
            py: 1.5,
            fontWeight: 600,
            textTransform: "none",
            background: `linear-gradient(135deg, ${project.categoryColor} 0%, ${project.categoryColor}80 100%)`,
            "&:hover": {
              background: `linear-gradient(135deg, ${project.categoryColor}80 0%, ${project.categoryColor} 100%)`,
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Fund Now
        </Button>
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const mockProjects = [
    {
      id: 1,
      name: "Borehole for 500 families in Kisumu",
      location: "Kisumu, Kenya",
      description: "Providing clean water access to 500 families through a sustainable borehole system with solar-powered pumps.",
      category: "Water",
      categoryColor: "#2196f3",
      fundingProgress: 70,
      raised: 35000,
      goal: 50000,
      team: "Kisumu Water Initiative",
      teamSize: 8,
      image: "https://via.placeholder.com/400x200/2196f3/ffffff?text=Water+Project",
      milestones: [
        { name: "Land Acquisition", status: "completed" },
        { name: "Construction", status: "in-progress" },
        { name: "Completion", status: "pending" },
      ],
    },
    {
      id: 2,
      name: "Solar Power for Rural School",
      location: "Mombasa, Kenya",
      description: "Installing solar panels to provide electricity for a rural school serving 200 students.",
      category: "Energy",
      categoryColor: "#ff9800",
      fundingProgress: 45,
      raised: 22500,
      goal: 50000,
      team: "Green Energy Kenya",
      teamSize: 5,
      image: "https://via.placeholder.com/400x200/ff9800/ffffff?text=Energy+Project",
      milestones: [
        { name: "Site Survey", status: "completed" },
        { name: "Installation", status: "pending" },
        { name: "Testing", status: "pending" },
      ],
    },
    {
      id: 3,
      name: "Mobile Health Clinic",
      location: "Nairobi, Kenya",
      description: "Mobile health clinic providing medical services to underserved communities in Nairobi slums.",
      category: "Health",
      categoryColor: "#f44336",
      fundingProgress: 90,
      raised: 90000,
      goal: 100000,
      team: "Health for All",
      teamSize: 12,
      image: "https://via.placeholder.com/400x200/f44336/ffffff?text=Health+Project",
      milestones: [
        { name: "Vehicle Purchase", status: "completed" },
        { name: "Equipment Setup", status: "completed" },
        { name: "Launch", status: "in-progress" },
      ],
    },
    {
      id: 4,
      name: "Digital Skills Training Center",
      location: "Eldoret, Kenya",
      description: "Training center providing digital skills and computer literacy to youth and women.",
      category: "Education",
      categoryColor: "#4caf50",
      fundingProgress: 30,
      raised: 15000,
      goal: 50000,
      team: "Digital Empowerment",
      teamSize: 6,
      image: "https://via.placeholder.com/400x200/4caf50/ffffff?text=Education+Project",
      milestones: [
        { name: "Center Setup", status: "in-progress" },
        { name: "Equipment Installation", status: "pending" },
        { name: "Training Start", status: "pending" },
      ],
    },
    {
      id: 5,
      name: "Community Garden Initiative",
      location: "Nakuru, Kenya",
      description: "Community garden providing fresh vegetables and income generation for local families.",
      category: "Agriculture",
      categoryColor: "#8bc34a",
      fundingProgress: 85,
      raised: 42500,
      goal: 50000,
      team: "Green Thumbs Kenya",
      teamSize: 10,
      image: "https://via.placeholder.com/400x200/8bc34a/ffffff?text=Agriculture+Project",
      milestones: [
        { name: "Land Preparation", status: "completed" },
        { name: "Planting", status: "completed" },
        { name: "Harvest", status: "in-progress" },
      ],
    },
    {
      id: 6,
      name: "Waste Management System",
      location: "Thika, Kenya",
      description: "Comprehensive waste management and recycling system for urban communities.",
      category: "Environment",
      categoryColor: "#009688",
      fundingProgress: 55,
      raised: 27500,
      goal: 50000,
      team: "Eco Solutions",
      teamSize: 7,
      image: "https://via.placeholder.com/400x200/009688/ffffff?text=Environment+Project",
      milestones: [
        { name: "System Design", status: "completed" },
        { name: "Implementation", status: "in-progress" },
        { name: "Community Training", status: "pending" },
      ],
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

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "funding", label: "Funding Progress" },
    { value: "goal", label: "Goal Amount" },
  ];

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || 
                           project.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, mb: 2 }}
        >
          Explore Projects
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Discover impactful projects from around the world and fund the ones that matter to you
        </Typography>
      </Box>

      {/* Filters and Search */}
      <Box mb={4}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} sm={6} lg={4} key={project.id}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" mb={2}>
            No projects found matching your criteria
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Projects;
