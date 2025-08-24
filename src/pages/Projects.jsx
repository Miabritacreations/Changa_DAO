import {
  CheckCircle as CheckIcon,
  Construction as ConstructionIcon,
  AttachMoney as FundIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Fade,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

// Project Card Component
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
    <Fade in={true} timeout={500}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          },
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={
            project.image ||
            "https://via.placeholder.com/400x200/667eea/ffffff?text=Project+Image"
          }
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
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, lineHeight: 1.3 }}>
            {project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
            {project.description}
          </Typography>

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
                height: 10,
                borderRadius: 5,
                background: "rgba(0,0,0,0.05)",
                "& .MuiLinearProgress-bar": {
                  background: `linear-gradient(90deg, ${project.categoryColor} 0%, ${project.categoryColor}80 100%)`,
                  borderRadius: 5,
                  transition: "width 1s ease-in-out",
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

          <Box mb={3}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
              Milestones
            </Typography>
            <Stack spacing={1}>
              {project.milestones.map((milestone, index) => (
                <Tooltip key={index} title={`Status: ${milestone.status}`}>
                  <Box display="flex" alignItems="center" gap={1}>
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
                </Tooltip>
              ))}
            </Stack>
          </Box>

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
    </Fade>
  );
};

// Projects Page
const Projects = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const mockProjects = [
    {
      id: 1,
      name: "Clean Water Initiative",
      description: "Building boreholes for clean water access in rural communities.",
      location: "Kisumu, Kenya",
      category: "Water",
      categoryColor: "#1E88E5",
      fundingProgress: 75,
      raised: 15000,
      goal: 20000,
      milestones: [
        { name: "Site Survey", status: "completed" },
        { name: "Drilling", status: "in-progress" },
        { name: "Pump Installation", status: "pending" },
      ],
      team: "Water Warriors",
      teamSize: 5,
      image: "",
    },
    {
      id: 2,
      name: "Solar School Project",
      description: "Installing solar panels to power classrooms and labs.",
      location: "Accra, Ghana",
      category: "Energy",
      categoryColor: "#F9A825",
      fundingProgress: 40,
      raised: 8000,
      goal: 20000,
      milestones: [
        { name: "Site Assessment", status: "completed" },
        { name: "Panel Installation", status: "in-progress" },
        { name: "System Testing", status: "pending" },
      ],
      team: "Sun Scholars",
      teamSize: 4,
      image: "",
    },
    // Add more projects here
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

  // Featured Projects for Hero Section
  const featuredProjects = mockProjects.slice(0, 2);

  // Filtered & Sorted Projects (excluding featured for main grid)
  const filteredProjects = mockProjects
    .filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" ||
        project.category.toLowerCase() === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "oldest") return a.id - b.id;
      if (sortBy === "funding") return b.fundingProgress - a.fundingProgress;
      if (sortBy === "goal") return b.goal - a.goal;
      return 0;
    });

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Hero Section */}
      <Box mb={6}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
          Featured Projects
        </Typography>
        <Grid container spacing={3}>
          {featuredProjects.map((project) => (
            <Grid item xs={12} md={6} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
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

      {/* Filters & Search */}
      <Grid container spacing={3} mb={4} alignItems="center">
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
