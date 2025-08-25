import {
  Add as AddIcon,
  Agriculture as AgricultureIcon,
  CalendarToday as CalendarIcon,
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
  AccountBalanceWallet as TreasuryIcon,
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
        setProjects([]);
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
    switch (statusStr) {
      case 'Active':
        return 'success';
      case 'Completed':
        return 'info';
      case 'PendingReview':
        return 'warning';
      case 'Draft':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    // Handle Motoko variant objects
    const statusStr = typeof status === 'object' ? Object.keys(status)[0] : status;
    switch (statusStr) {
      case 'Active':
        return <CheckCircleIcon />;
      case 'Completed':
        return <CheckCircleIcon />;
      case 'PendingReview':
        return <ScheduleIcon />;
      case 'Draft':
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
    { label: 'Active Projects', value: projects.filter(p => p.status === 'Active').length, icon: <ScheduleIcon />, color: 'warning' },
    { label: 'Completed', value: projects.filter(p => p.status === 'Completed').length, icon: <CheckCircleIcon />, color: 'success' },
    { label: 'Total Funding', value: `$${projects.reduce((sum, p) => sum + (p.raised || 0), 0).toLocaleString()}`, icon: <TreasuryIcon />, color: 'info' },
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
      backgroundColor: '#1a1a1a',
      color: 'white',
      p: 3
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
            Projects
          </Typography>
          <Typography variant="h6" sx={{ color: '#b0b0b0' }}>
            Explore and manage community projects
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateProjectDialog(true)}
          sx={{
            background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1E88E5, #1565C0)',
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
                backgroundColor: '#2a2a2a',
                border: '1px solid #3a3a3a',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
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
                <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
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
                  backgroundColor: '#2a2a2a',
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
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#b0b0b0',
                  opacity: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a' }}>
              <Tabs
                value={filter}
                onChange={handleFilterChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    color: '#b0b0b0',
                    '&.Mui-selected': {
                      color: '#42A5F5',
                    },
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#42A5F5',
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
                  label={`Active (${projects.filter(p => p.status === 'Active').length})`}
                  value="active"
                  icon={<ScheduleIcon />}
                  iconPosition="start"
                />
                <Tab
                  label={`Completed (${projects.filter(p => p.status === 'Completed').length})`}
                  value="completed"
                  icon={<CheckCircleIcon />}
                  iconPosition="start"
                />
                <Tab
                  label={`Planning (${projects.filter(p => p.status === 'Planning').length})`}
                  value="planning"
                  icon={<FilterIcon />}
                  iconPosition="start"
                />
              </Tabs>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <Typography sx={{ color: 'white' }}>Loading projects...</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={Number(project.id)}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #3a3a3a',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          backgroundColor: 'primary.light',
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
                          color="primary"
                          variant="outlined"
                          sx={{ 
                            backgroundColor: 'rgba(33, 150, 243, 0.1)',
                            borderColor: '#2196f3',
                            color: '#2196f3'
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
                        backgroundColor: variantToString(project.status) === 'Active' ? 'rgba(76, 175, 80, 0.1)' :
                          variantToString(project.status) === 'Completed' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                        color: variantToString(project.status) === 'Active' ? '#4caf50' :
                          variantToString(project.status) === 'Completed' ? '#4caf50' : '#ff9800'
                      }}
                    />
                  </Box>

                  {/* Title and Description */}
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6, color: '#b0b0b0' }}>
                    {project.description}
                  </Typography>

                  {/* Location and Date */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationIcon sx={{ fontSize: 16, color: '#b0b0b0' }} />
                      <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                        {project.location || 'Location TBD'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarIcon sx={{ fontSize: 16, color: '#b0b0b0' }} />
                      <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                        {project.startDate || 'Start Date TBD'}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Progress Bar */}
                  {project.percent && (
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
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
                          backgroundColor: '#3a3a3a',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: project.percent >= 90 ? '#ff9800' : '#4caf50',
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
                      <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                        Raised
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                        {project.goal ? `$${project.goal.toLocaleString()}` : '—'}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                        Goal
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                        {project.contributors || 0}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                        Contributors
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: '#3a3a3a' }} />

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
                        borderColor: '#3a3a3a',
                        color: '#b0b0b0',
                        '&:hover': {
                          borderColor: '#4a4a4a',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                        },
                        '&.Mui-disabled': {
                          borderColor: '#2a2a2a',
                          color: '#666666',
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
