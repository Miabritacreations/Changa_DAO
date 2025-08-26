import {
  Timeline as ActivityIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  Group as GroupIcon,
  AttachMoney as MoneyIcon,
  HowToVote as ProposalsIcon,
  School as SchoolIcon,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as ViewAllIcon,
  HowToVote as VotingIcon,
  WaterDrop as WaterIcon
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from "@mui/material";
import React from "react";
import { getBackendActor } from "../api/canister";

const Dashboard = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const theme = useTheme();

  console.log('Dashboard component loaded');

  React.useEffect(() => {
    (async () => {
      try {
        const backend = await getBackendActor();
        const res = await backend.getDashboardData();
        setData(res);
      } catch (_e) {
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const metricCards = [
    {
      title: 'Total Invested',
      value: '$45,230',
      icon: <MoneyIcon />,
      color: 'success',
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Active Projects',
      value: '8',
      icon: <GroupIcon />,
      color: 'primary',
      trend: '+2',
      trendUp: true
    },
    {
      title: 'Impact Score',
      value: '94.2',
      icon: <AssessmentIcon />,
      color: 'warning',
      trend: '+5.3%',
      trendUp: true
    },
    {
      title: 'Voting Power',
      value: '1,250',
      icon: <VotingIcon />,
      color: 'secondary',
      trend: '+150',
      trendUp: true
    }
  ];

  const recentProjects = [
    {
      id: 1,
      title: 'Rural School Construction',
      category: 'Education',
      location: 'Kenya',
      progress: 75,
      raised: 45000,
      goal: 60000,
      status: 'active',
      icon: <SchoolIcon />
    },
    {
      id: 2,
      title: 'Clean Water Borehole',
      category: 'Infrastructure',
      location: 'Tanzania',
      progress: 90,
      raised: 28000,
      goal: 30000,
      status: 'near-completion',
      icon: <WaterIcon />
    }
  ];

  const recentActivity = [
    {
      id: 1,
      description: 'Rural School Construction completed foundation phase',
      time: '2 hours ago',
      type: 'milestone'
    },
    {
      id: 2,
      description: 'New proposal available for community voting',
      time: '5 hours ago',
      type: 'voting'
    },
    {
      id: 3,
      description: '$15,000 released to Clean Water project',
      time: '1 day ago',
      type: 'funds'
    }
  ];

  // Helper function to convert variant objects to strings
  const variantToString = (variant) => {
    if (typeof variant === 'object' && variant !== null) {
      return Object.keys(variant)[0];
    }
    return variant;
  };

  const getStatusColor = (status) => {
    // Handle Motoko variant objects
    const statusStr = typeof status === 'object' ? Object.keys(status)[0] : status;
    switch (statusStr?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'completed':
        return 'info';
      case 'pendingreview':
        return 'warning';
      case 'draft':
        return 'default';
      default:
        return 'default';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'milestone':
        return <CheckCircleIcon />;
      case 'voting':
        return <ProposalsIcon />;
      case 'funds':
        return <MoneyIcon />;
      default:
        return <ActivityIcon />;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#0F172A',
      color: 'white',
      p: 3
    }}>
      {/* Dashboard Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
          Dashboard
        </Typography>
        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
          Welcome back! Here's what's happening with your investments.
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <Typography sx={{ color: '#94A3B8' }}>Loading dashboard data...</Typography>
        </Box>
      ) : (
        <>
          {/* Key Metrics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {metricCards.map((metric, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
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
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Avatar
                        sx={{
                          backgroundColor: `${metric.color}.main`,
                          color: 'white',
                          width: 48,
                          height: 48,
                        }}
                      >
                        {metric.icon}
                      </Avatar>
                      <Chip
                        icon={metric.trendUp ? <TrendingUpIcon /> : <TrendingDownIcon />}
                        label={metric.trend}
                        size="small"
                        color={metric.trendUp ? 'success' : 'error'}
                        variant="outlined"
                        sx={{ 
                          backgroundColor: metric.trendUp ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          borderColor: metric.trendUp ? '#10B981' : '#EF4444',
                          color: metric.trendUp ? '#10B981' : '#EF4444'
                        }}
                      />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                      {metric.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Recent Projects and Activity */}
          <Grid container spacing={3}>
            {/* Recent Projects */}
            <Grid item xs={12} lg={8}>
              <Card sx={{ 
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: 3
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: 'white' }}>
                      Recent Projects
                    </Typography>
                    <Button
                      variant="outlined"
                      endIcon={<ViewAllIcon />}
                      sx={{
                        borderColor: '#10B981',
                        color: '#10B981',
                        '&:hover': {
                          borderColor: '#059669',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        },
                      }}
                    >
                      View All
                    </Button>
                  </Box>
                  
                  <Box sx={{ space: 3 }}>
                    {recentProjects.map((project, index) => (
                      <Box key={project.id} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar
                            sx={{
                              backgroundColor: '#3B82F6',
                              color: 'white',
                              width: 40,
                              height: 40,
                              mr: 2,
                            }}
                          >
                            {project.icon}
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 0.5 }}>
                              {project.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Chip
                                label={project.category}
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{ 
                                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                  borderColor: '#2196f3',
                                  color: '#2196f3'
                                }}
                              />
                              <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                                {project.location}
                              </Typography>
                            </Box>
                          </Box>
                          <Chip
                            label={variantToString(project.status)}
                            color={getStatusColor(project.status)}
                            size="small"
                            sx={{
                              backgroundColor: variantToString(project.status)?.toLowerCase() === 'active' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                              color: variantToString(project.status)?.toLowerCase() === 'active' ? '#4caf50' : '#ff9800'
                            }}
                          />
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                              Progress
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                              {project.progress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={project.progress}
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              backgroundColor: '#3a3a3a',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: project.progress >= 90 ? '#ff9800' : '#4caf50',
                              }
                            }}
                          />
                        </Box>
                        
                        <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                          ${project.raised.toLocaleString()} / ${project.goal.toLocaleString()}
                        </Typography>
                        
                        {index < recentProjects.length - 1 && (
                          <Divider sx={{ mt: 3, borderColor: '#3a3a3a' }} />
                        )}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ 
                backgroundColor: '#2a2a2a',
                border: '1px solid #3a3a3a',
                borderRadius: 3
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'white' }}>
                    Recent Activity
                  </Typography>
                  
                  <List sx={{ p: 0 }}>
                    {recentActivity.map((activity, index) => (
                      <React.Fragment key={activity.id}>
                        <ListItem sx={{ px: 0, py: 2 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: 'primary.light',
                                color: 'white',
                              }}
                            >
                              {getActivityIcon(activity.type)}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                                {activity.description}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="caption" sx={{ color: '#b0b0b0' }}>
                                {activity.time}
                              </Typography>
                            }
                          />
                        </ListItem>
                        {index < recentActivity.length - 1 && (
                          <Divider sx={{ borderColor: '#3a3a3a' }} />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Dashboard; 
