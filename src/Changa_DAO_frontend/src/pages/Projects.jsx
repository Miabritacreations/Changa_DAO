import {
  Add as AddIcon,
  Agriculture as AgricultureIcon,
  CalendarToday as CalendarIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
  FilterList as FilterIcon,
  LocalHospital as HealthIcon,
  Info as InfoIcon,
  LocationOn as LocationIcon,
  Business as ProjectsIcon,
  Schedule as ScheduleIcon,
  School as SchoolIcon,
  Search as SearchIcon,
  WaterDrop as WaterIcon
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputAdornment,
  LinearProgress,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import React from "react";
import { getBackendActor } from "../api/canister";

const Projects = () => {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [createProjectDialog, setCreateProjectDialog] = React.useState(false);
  const [newProject, setNewProject] = React.useState({
    title: '',
    description: '',
    category: '',
    location: '',
    latitude: 0,
    longitude: 0,
    goalAmount: 0,
    nftSupply: 0,
    nftPrice: 0,
    tags: [],
    milestones: []
  });
  const [mintDialog, setMintDialog] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [mintQuantity, setMintQuantity] = React.useState(1);
  const theme = useTheme();

  console.log('Projects component loaded');

  React.useEffect(() => {
    (async () => {
      try {
        const backend = await getBackendActor();
        const list = await backend.getProposals();
        setProjects(list);
      } catch (_e) {
        // Set comprehensive dummy data with different project statuses
        const dummyProjects = [
          {
            id: 1,
            title: "Solar Power for Rural Clinics",
            description: "Install solar panels to power medical equipment in 3 clinics serving 10,000 people. This project will provide reliable electricity for life-saving medical procedures.",
            category: "Healthcare",
            location: "Nairobi, Kenya",
            status: "Active",
            raised: 28000,
            goal: 35000,
            percent: 80,
            startDate: "2024-01-15",
            endDate: "2024-06-30",
            nftSupply: 100,
            nftPrice: 350,
            tags: ["Renewable Energy", "Healthcare", "Rural Development"]
          },
          {
            id: 2,
            title: "Digital Learning Center",
            description: "Modern computer lab and digital literacy program for underserved students. Includes 50 computers, internet connectivity, and certified instructors.",
            category: "Education",
            location: "Mombasa, Kenya",
            status: "Active",
            raised: 12000,
            goal: 15000,
            percent: 80,
            startDate: "2024-02-01",
            endDate: "2024-08-15",
            nftSupply: 75,
            nftPrice: 200,
            tags: ["Education", "Technology", "Youth Empowerment"]
          },
          {
            id: 3,
            title: "Clean Water for Village",
            description: "Build a sustainable water system with purification for 500 families. Includes borehole drilling, water treatment, and distribution network.",
            category: "Water",
            location: "Kisumu, Kenya",
            status: "Active",
            raised: 18750,
            goal: 25000,
            percent: 75,
            startDate: "2024-01-20",
            endDate: "2024-07-30",
            nftSupply: 125,
            nftPrice: 200,
            tags: ["Water", "Infrastructure", "Community Health"]
          },
          {
            id: 4,
            title: "Community Health Outreach",
            description: "Mobile health screenings and vaccinations across rural wards. Provides essential healthcare services to remote communities.",
            category: "Healthcare",
            location: "Nakuru, Kenya",
            status: "Completed",
            raised: 6000,
            goal: 6000,
            percent: 100,
            startDate: "2023-10-01",
            endDate: "2024-03-15",
            nftSupply: 60,
            nftPrice: 100,
            tags: ["Healthcare", "Mobile Services", "Prevention"]
          },
          {
            id: 5,
            title: "Irrigation for Smallholders",
            description: "Low-cost drip irrigation to increase farm yields by 40%. Supports 200 small-scale farmers with sustainable farming practices.",
            category: "Agriculture",
            location: "Eldoret, Kenya",
            status: "Active",
            raised: 9000,
            goal: 20000,
            percent: 45,
            startDate: "2024-03-01",
            endDate: "2024-09-30",
            nftSupply: 100,
            nftPrice: 200,
            tags: ["Agriculture", "Sustainability", "Food Security"]
          },
          {
            id: 6,
            title: "Youth Skills Training Center",
            description: "Vocational training center for unemployed youth. Offers courses in carpentry, welding, and electrical work.",
            category: "Education",
            location: "Thika, Kenya",
            status: "Failed",
            raised: 8000,
            goal: 25000,
            percent: 32,
            startDate: "2023-11-01",
            endDate: "2024-05-30",
            nftSupply: 100,
            nftPrice: 250,
            tags: ["Education", "Vocational Training", "Youth Employment"]
          },
          {
            id: 7,
            title: "Emergency Medical Response",
            description: "Ambulance service and emergency response system for rural areas. Includes vehicle, equipment, and trained personnel.",
            category: "Healthcare",
            location: "Kakamega, Kenya",
            status: "Completed",
            raised: 15000,
            goal: 15000,
            percent: 100,
            startDate: "2023-08-01",
            endDate: "2024-01-31",
            nftSupply: 75,
            nftPrice: 200,
            tags: ["Healthcare", "Emergency Services", "Public Safety"]
          },
          {
            id: 8,
            title: "Sustainable Fish Farming",
            description: "Aquaculture project to provide protein and income for coastal communities. Includes training and market access.",
            category: "Agriculture",
            location: "Lamu, Kenya",
            status: "Active",
            raised: 22000,
            goal: 30000,
            percent: 73,
            startDate: "2024-02-15",
            endDate: "2024-08-31",
            nftSupply: 150,
            nftPrice: 200,
            tags: ["Agriculture", "Aquaculture", "Coastal Development"]
          },
          {
            id: 9,
            title: "Renewable Energy Microgrid",
            description: "Community-owned solar microgrid to provide electricity for 300 households. Includes battery storage and smart metering.",
            category: "Infrastructure",
            location: "Garissa, Kenya",
            status: "Failed",
            raised: 12000,
            goal: 40000,
            percent: 30,
            startDate: "2023-12-01",
            endDate: "2024-06-30",
            nftSupply: 200,
            nftPrice: 200,
            tags: ["Renewable Energy", "Infrastructure", "Community Ownership"]
          },
          {
            id: 10,
            title: "Women's Entrepreneurship Hub",
            description: "Business incubator and training center for women entrepreneurs. Provides mentorship, funding access, and networking.",
            category: "Business",
            location: "Nyeri, Kenya",
            status: "Active",
            raised: 18000,
            goal: 25000,
            percent: 72,
            startDate: "2024-01-10",
            endDate: "2024-07-31",
            nftSupply: 100,
            nftPrice: 250,
            tags: ["Business", "Women Empowerment", "Entrepreneurship"]
          }
        ];
        setProjects(dummyProjects);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Helper function to convert variant objects to strings
  const variantToString = (variant) => {
    if (typeof variant === 'object' && variant !== null) {
      return Object.keys(variant)[0];
    }
    return variant;
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'healthcare':
      case 'health':
        return <HealthIcon />;
      case 'education':
        return <SchoolIcon />;
      case 'water':
        return <WaterIcon />;
      case 'agriculture':
        return <AgricultureIcon />;
      default:
        return <ProjectsIcon />;
    }
  };

  const getStatusColor = (status) => {
    // Handle Motoko variant objects
    const statusStr = typeof status === 'object' ? Object.keys(status)[0] : status;
    switch (statusStr?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'completed':
        return 'info';
      case 'failed':
        return 'error';
      case 'pendingreview':
        return 'warning';
      case 'draft':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    // Handle Motoko variant objects
    const statusStr = typeof status === 'object' ? Object.keys(status)[0] : status;
    switch (statusStr?.toLowerCase()) {
      case 'active':
        return <CheckCircleIcon />;
      case 'completed':
        return <CheckCircleIcon />;
      case 'failed':
        return <CancelIcon />;
      case 'pendingreview':
        return <ScheduleIcon />;
      case 'draft':
        return <EditIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || variantToString(project.status)?.toLowerCase() === filter.toLowerCase();
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.category?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
  };

  const projectStats = [
    { label: 'Total Projects', value: projects.length, icon: <ProjectsIcon />, color: 'primary' },
    { label: 'Active Projects', value: projects.filter(p => variantToString(p.status) === 'Active').length, icon: <ScheduleIcon />, color: 'warning' },
    { label: 'Completed', value: projects.filter(p => variantToString(p.status) === 'Completed').length, icon: <CheckCircleIcon />, color: 'success' },
    { label: 'Failed', value: projects.filter(p => variantToString(p.status) === 'Failed').length, icon: <CancelIcon />, color: 'error' },
  ];

  const handleCreateProject = async () => {
    try {
      const backend = await getBackendActor();
      const result = await backend.createProject({
        title: newProject.title,
        description: newProject.description,
        category: newProject.category,
        location: newProject.location,
        latitude: newProject.latitude,
        longitude: newProject.longitude,
        goalAmount: BigInt(newProject.goalAmount),
        nftSupply: BigInt(newProject.nftSupply),
        nftPrice: BigInt(newProject.nftPrice),
        tags: newProject.tags,
        milestones: newProject.milestones
      });

      if ('ok' in result) {
        setCreateProjectDialog(false);
        setNewProject({
          title: '',
          description: '',
          category: '',
          location: '',
          latitude: 0,
          longitude: 0,
          goalAmount: 0,
          nftSupply: 0,
          nftPrice: 0,
          tags: [],
          milestones: []
        });
        // Refresh projects
        window.location.reload();
      } else {
        alert('Failed to create project: ' + result.err);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project. Please try again.');
    }
  };

  const handleMintNFT = async () => {
    if (!selectedProject) return;
    
    try {
      const backend = await getBackendActor();
      const result = await backend.mintNFT(BigInt(selectedProject.id), BigInt(mintQuantity));
      
      if ('ok' in result) {
        setMintDialog(false);
        setSelectedProject(null);
        setMintQuantity(1);
        alert(`Successfully minted ${mintQuantity} NFT(s)!`);
        // Refresh projects
        window.location.reload();
      } else {
        alert('Failed to mint NFT: ' + result.err);
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Error minting NFT. Please try again.');
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#0F172A',
      color: 'white',
      p: 3
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
            Projects
          </Typography>
          <Typography variant="h6" sx={{ color: '#94A3B8' }}>
            Explore and manage community projects
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateProjectDialog(true)}
          sx={{
            background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1E3A8A, #1E40AF)',
            },
          }}
        >
          Create Project
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {projectStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)',
                  borderColor: '#3B82F6',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      backgroundColor: `${stat.color}.main`,
                      color: 'white',
                      width: 48,
                      height: 48,
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Search and Filter */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#b0b0b0' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#1E293B',
                  borderColor: '#334155',
                  color: 'white',
                  '& fieldset': {
                    borderColor: '#334155',
                  },
                  '&:hover fieldset': {
                    borderColor: '#475569',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3B82F6',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#94A3B8',
                  opacity: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}>
              <Tabs
                value={filter}
                onChange={handleFilterChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    color: '#94A3B8',
                    '&.Mui-selected': {
                      color: '#3B82F6',
                    },
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#3B82F6',
                  },
                }}
              >
                <Tab
                  label={`All (${projects.length})`}
                  value="all"
                  icon={<FilterIcon />}
                  iconPosition="start"
                />
                <Tab
                  label={`Available (${projects.filter(p => variantToString(p.status) === 'Active').length})`}
                  value="active"
                  icon={<ScheduleIcon />}
                  iconPosition="start"
                />
                <Tab
                  label={`Completed (${projects.filter(p => variantToString(p.status) === 'Completed').length})`}
                  value="completed"
                  icon={<CheckCircleIcon />}
                  iconPosition="start"
                />
                <Tab
                  label={`Failed (${projects.filter(p => variantToString(p.status) === 'Failed').length})`}
                  value="failed"
                  icon={<CancelIcon />}
                  iconPosition="start"
                />
              </Tabs>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <Typography sx={{ color: '#94A3B8' }}>Loading projects...</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={Number(project.id)}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)',
                    borderColor: '#3B82F6',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          backgroundColor: '#3B82F6',
                          color: 'white',
                          width: 40,
                          height: 40,
                        }}
                      >
                        {getCategoryIcon(project.category)}
                      </Avatar>
                      <Box>
                        <Chip
                          label={project.category || 'General'}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            borderColor: '#3B82F6',
                            color: '#3B82F6'
                          }}
                        />
                      </Box>
                    </Box>
                    <Chip
                      icon={getStatusIcon(project.status)}
                      label={variantToString(project.status)}
                      color={getStatusColor(project.status)}
                      variant="filled"
                      sx={{
                        backgroundColor: variantToString(project.status) === 'Active' ? 'rgba(16, 185, 129, 0.1)' :
                          variantToString(project.status) === 'Completed' ? 'rgba(59, 130, 246, 0.1)' :
                          variantToString(project.status) === 'Failed' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(249, 115, 22, 0.1)',
                        color: variantToString(project.status) === 'Active' ? '#10B981' :
                          variantToString(project.status) === 'Completed' ? '#3B82F6' :
                          variantToString(project.status) === 'Failed' ? '#EF4444' : '#F97316'
                      }}
                    />
                  </Box>

                  {/* Title and Description */}
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6, color: '#94A3B8' }}>
                    {project.description}
                  </Typography>

                  {/* Location and Date */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationIcon sx={{ fontSize: 16, color: '#94A3B8' }} />
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        {project.location || 'Location TBD'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarIcon sx={{ fontSize: 16, color: '#94A3B8' }} />
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        {project.startDate || 'Start Date TBD'}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Progress Bar */}
                  {project.percent && (
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                          Progress
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                          {project.percent}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={project.percent}
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: '#334155',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: variantToString(project.status) === 'Failed' ? '#EF4444' :
                              variantToString(project.status) === 'Completed' ? '#3B82F6' :
                              project.percent >= 90 ? '#F97316' : '#10B981',
                          }
                        }}
                      />
                    </Box>
                  )}

                  {/* Stats */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#42A5F5' }}>
                        {project.raised ? `$${project.raised.toLocaleString()}` : '—'}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        Raised
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                        {project.goal ? `$${project.goal.toLocaleString()}` : '—'}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        Goal
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                        {project.contributors || 0}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                        Contributors
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: '#334155' }} />

                  {/* Actions */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      disabled={variantToString(project.status) !== 'Active'}
                      onClick={() => {
                        if (variantToString(project.status) === 'Active') {
                          setSelectedProject(project);
                          setMintDialog(true);
                        }
                      }}
                      sx={{
                        borderColor: '#475569',
                        color: '#94A3B8',
                        '&:hover': {
                          borderColor: '#64748B',
                          backgroundColor: 'rgba(148, 163, 184, 0.1)',
                        },
                        '&.Mui-disabled': {
                          borderColor: '#334155',
                          color: '#64748B',
                        },
                      }}
                    >
                      {variantToString(project.status) === 'Active' ? 'Mint NFT' : 'View Details'}
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      disabled={variantToString(project.status) !== 'Active'}
                      sx={{
                        background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1E3A8A, #1E40AF)',
                        },
                        '&.Mui-disabled': {
                          background: '#334155',
                          color: '#64748B',
                        },
                      }}
                    >
                      {variantToString(project.status) === 'Active' ? 'Get Updates' : 'Learn More'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && filteredProjects.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <ProjectsIcon sx={{ fontSize: 64, color: '#b0b0b0', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#b0b0b0', mb: 1 }}>
            No projects found
          </Typography>
          <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
            {filter === 'all' 
              ? 'No projects have been created yet.' 
              : `No ${filter} projects found.`
            }
          </Typography>
        </Box>
      )}

      {/* Create Project Dialog */}
      <Dialog 
        open={createProjectDialog} 
        onClose={() => setCreateProjectDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: 3,
          }
        }}
      >
        <DialogTitle sx={{ color: 'white', borderBottom: '1px solid #3a3a3a' }}>
          Create New Project
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Title"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1a1a1a',
                    borderColor: '#3a3a3a',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#3a3a3a',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4a4a4a',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#42A5F5',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1a1a1a',
                    borderColor: '#3a3a3a',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#3a3a3a',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4a4a4a',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#42A5F5',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Category"
                value={newProject.category}
                onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1a1a1a',
                    borderColor: '#3a3a3a',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#3a3a3a',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4a4a4a',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#42A5F5',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={newProject.location}
                onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1a1a1a',
                    borderColor: '#3a3a3a',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#3a3a3a',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4a4a4a',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#42A5F5',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Goal Amount ($)"
                value={newProject.goalAmount}
                onChange={(e) => setNewProject({...newProject, goalAmount: parseInt(e.target.value) || 0})}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1a1a1a',
                    borderColor: '#3a3a3a',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#3a3a3a',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4a4a4a',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#42A5F5',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="NFT Price ($)"
                value={newProject.nftPrice}
                onChange={(e) => setNewProject({...newProject, nftPrice: parseInt(e.target.value) || 0})}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1a1a1a',
                    borderColor: '#3a3a3a',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#3a3a3a',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4a4a4a',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#42A5F5',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #3a3a3a' }}>
          <Button
            onClick={() => setCreateProjectDialog(false)}
            sx={{
              color: '#b0b0b0',
              borderColor: '#3a3a3a',
              '&:hover': {
                borderColor: '#4a4a4a',
                backgroundColor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateProject}
            variant="contained"
            disabled={!newProject.title || !newProject.description || !newProject.category || !newProject.location || newProject.goalAmount <= 0 || newProject.nftPrice <= 0}
            sx={{
              background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1E88E5, #1565C0)',
              },
              '&.Mui-disabled': {
                background: '#2a2a2a',
                color: '#666666',
              },
            }}
          >
            Create Project
          </Button>
        </DialogActions>
      </Dialog>

      {/* Mint NFT Dialog */}
      <Dialog 
        open={mintDialog} 
        onClose={() => setMintDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: 3,
          }
        }}
      >
        <DialogTitle sx={{ color: 'white', borderBottom: '1px solid #3a3a3a' }}>
          Mint Impact NFT
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedProject && (
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                {selectedProject.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 3 }}>
                {selectedProject.description}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 1 }}>
                  NFT Price: ${selectedProject.nftPrice?.toLocaleString() || '0'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 2 }}>
                  Available Supply: {selectedProject.nftSupply || 0} NFTs
                </Typography>
              </Box>

              <TextField
                fullWidth
                type="number"
                label="Quantity"
                value={mintQuantity}
                onChange={(e) => setMintQuantity(parseInt(e.target.value) || 1)}
                inputProps={{ min: 1, max: selectedProject.nftSupply || 100 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1a1a1a',
                    borderColor: '#3a3a3a',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#3a3a3a',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4a4a4a',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#42A5F5',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b0b0',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />

              <Box sx={{ mt: 2, p: 2, backgroundColor: '#1a1a1a', borderRadius: 2, border: '1px solid #3a3a3a' }}>
                <Typography variant="body2" sx={{ color: '#b0b0b0', mb: 1 }}>
                  Total Cost: ${((selectedProject.nftPrice || 0) * mintQuantity).toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666666' }}>
                  This NFT represents your contribution to positive social impact
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #3a3a3a' }}>
          <Button
            onClick={() => setMintDialog(false)}
            sx={{
              color: '#b0b0b0',
              borderColor: '#3a3a3a',
              '&:hover': {
                borderColor: '#4a4a4a',
                backgroundColor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleMintNFT}
            variant="contained"
            disabled={!selectedProject || mintQuantity <= 0}
            sx={{
              background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1E88E5, #1565C0)',
              },
              '&.Mui-disabled': {
                background: '#2a2a2a',
                color: '#666666',
              },
            }}
          >
            Mint NFT
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;
