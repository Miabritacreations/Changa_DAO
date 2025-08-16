import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  CircularProgress,
  Paper,
  Stack,
  Button,
  IconButton,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import {
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  AccountBalance as TreasuryIcon,
  TrendingUp as TrendingUpIcon,
  HowToVote as VoteIcon,
  Notifications as NotificationIcon,
  Refresh as RefreshIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { getDashboardData } from "../api/dashboard";
import internetIdentityService from "../services/internetIdentity";

const StatCard = ({ title, value, icon, color, subtitle, onClick }) => (
  <Card 
    sx={{ 
      height: '100%', 
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.3s ease',
      '&:hover': onClick ? {
        transform: 'translateY(-4px)',
        boxShadow: 4,
      } : {},
      background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
      border: `1px solid ${color}30`,
    }}
    onClick={onClick}
  >
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: color }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

const ActivityItem = ({ activity, timestamp, type }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'proposal': return <AssignmentIcon />;
      case 'vote': return <VoteIcon />;
      case 'treasury': return <TreasuryIcon />;
      default: return <NotificationIcon />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'proposal': return '#2196f3';
      case 'vote': return '#4caf50';
      case 'treasury': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  return (
    <ListItem sx={{ px: 0 }}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: getActivityColor(type) }}>
          {getActivityIcon(type)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={activity}
        secondary={timestamp}
        primaryTypographyProps={{ variant: 'body2' }}
        secondaryTypographyProps={{ variant: 'caption' }}
      />
    </ListItem>
  );
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPrincipal, setUserPrincipal] = useState(null);
  const [votingPower, setVotingPower] = useState(0);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        setDashboardData(data);
        
        // Get user principal for voting power calculation
        const principal = internetIdentityService.getUserPrincipal();
        setUserPrincipal(principal);
        
        // Mock voting power based on principal (in real app, this would come from token balance)
        if (principal) {
          const mockVotingPower = Math.floor(Math.random() * 1000) + 100;
          setVotingPower(mockVotingPower);
        }
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleViewProposals = () => {
    window.location.href = '/proposals';
  };

  const handleCreateProposal = () => {
    window.location.href = '/proposals?create=true';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  const mockRecentActivity = [
    { activity: "Proposal #17: Community Garden Initiative", timestamp: "2 hours ago", type: "proposal" },
    { activity: "You voted YES on Proposal #16", timestamp: "1 day ago", type: "vote" },
    { activity: "Treasury received 50 ICP donation", timestamp: "2 days ago", type: "treasury" },
    { activity: "New member joined: Alice.ic0", timestamp: "3 days ago", type: "member" },
    { activity: "Proposal #15: Website Redesign passed", timestamp: "1 week ago", type: "proposal" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome to Changa DAO
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your decentralized governance dashboard
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Tooltip title="Refresh Dashboard">
            <IconButton onClick={handleRefresh} sx={{ bgcolor: 'background.paper' }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateProposal}
            sx={{ borderRadius: 2 }}
          >
            Create Proposal
          </Button>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Members"
            value={dashboardData?.totalMembers || 42}
            icon={<PeopleIcon />}
            color="#2196f3"
            subtitle="Active participants"
            onClick={handleViewProposals}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Proposals"
            value={dashboardData?.totalProposals || 17}
            icon={<AssignmentIcon />}
            color="#4caf50"
            subtitle="Open for voting"
            onClick={handleViewProposals}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Treasury Balance"
            value={`${dashboardData?.treasury || 12345.67} ICP`}
            icon={<TreasuryIcon />}
            color="#ff9800"
            subtitle="Available funds"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Your Voting Power"
            value={votingPower}
            icon={<VoteIcon />}
            color="#9c27b0"
            subtitle="Governance tokens"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                  Recent Activity
                </Typography>
                <Chip 
                  label="Live" 
                  color="success" 
                  size="small" 
                  icon={<TrendingUpIcon />}
                />
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List sx={{ p: 0 }}>
                {mockRecentActivity.map((item, index) => (
                  <React.Fragment key={index}>
                    <ActivityItem {...item} />
                    {index < mockRecentActivity.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Box textAlign="center" mt={2}>
                <Button variant="outlined" size="small">
                  View All Activity
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions & User Info */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* User Info Card */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Your Profile
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar sx={{ width: 56, height: 56 }}>
                    <PeopleIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {userPrincipal ? `${userPrincipal.toString().slice(0, 8)}...` : 'Anonymous'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      DAO Member
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Voting Power
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(votingPower / 1000) * 100} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {votingPower} / 1000 tokens
                  </Typography>
                </Box>
                <Button variant="outlined" fullWidth size="small">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Quick Actions
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    fullWidth
                    onClick={handleCreateProposal}
                    sx={{ borderRadius: 2 }}
                  >
                    Create Proposal
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ViewIcon />}
                    fullWidth
                    onClick={handleViewProposals}
                    sx={{ borderRadius: 2 }}
                  >
                    View Proposals
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<VoteIcon />}
                    fullWidth
                    onClick={() => window.location.href = '/voting'}
                    sx={{ borderRadius: 2 }}
                  >
                    Vote Now
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            {/* DAO Stats */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  DAO Statistics
                </Typography>
                <Stack spacing={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Participation Rate</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>78%</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Avg. Proposal Duration</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>7 days</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Success Rate</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>85%</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 