import {
    Analytics as AnalyticsIcon,
    ArrowBack as ArrowBackIcon,
    Assessment as AssessmentIcon,
    BarChart as ChartIcon,
    LocationOn as LocationIcon,
    Timeline as TimelineIcon
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
    useTheme
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Track = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const trackingFeatures = [
    {
      icon: <LocationIcon />,
      title: "Real-Time Location Tracking",
      description: "Track project implementation with GPS coordinates and geo-tagged updates.",
      details: "Every project milestone includes location verification, allowing funders to see exactly where their contributions are making an impact."
    },
    {
      icon: <TimelineIcon />,
      title: "Progress Timeline",
      description: "Visual timeline showing project milestones, completion status, and upcoming activities.",
      details: "Interactive timeline displays project phases, completed milestones, and expected completion dates for transparency."
    },
    {
      icon: <ChartIcon />,
      title: "Impact Analytics",
      description: "Comprehensive analytics showing project outcomes and community impact metrics.",
      details: "Track key performance indicators including beneficiaries reached, infrastructure improvements, and community satisfaction scores."
    }
  ];

  const trackingMetrics = [
    {
      title: "Financial Tracking",
      description: "Complete transparency in fund allocation and expenditure",
      metrics: ["Budget utilization", "Fund flow tracking", "Expense categorization", "Milestone-based releases"]
    },
    {
      title: "Progress Monitoring",
      description: "Real-time updates on project implementation and milestone completion",
      metrics: ["Task completion rates", "Timeline adherence", "Quality assurance", "Risk identification"]
    },
    {
      title: "Impact Assessment",
      description: "Measurement of project outcomes and community benefits",
      metrics: ["Beneficiary count", "Community feedback", "Sustainability indicators", "Long-term impact"]
    },
    {
      title: "Stakeholder Engagement",
      description: "Tracking community participation and stakeholder involvement",
      metrics: ["Local participation", "Stakeholder feedback", "Community ownership", "Capacity building"]
    }
  ];

  const dashboardFeatures = [
    {
      title: "Project Overview",
      description: "High-level view of all your funded projects with key metrics and status indicators."
    },
    {
      title: "Detailed Reports",
      description: "Comprehensive reports on project progress, financials, and impact measurements."
    },
    {
      title: "Interactive Maps",
      description: "Visual representation of project locations and impact areas using interactive maps."
    },
    {
      title: "Community Updates",
      description: "Regular updates from project teams and community members about project impact."
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#0F172A',
      color: 'white',
      pt: 4
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mb: 3, color: '#94A3B8', '&:hover': { color: 'white' } }}
          >
            Back
          </Button>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, color: 'white' }}>
            Track Impact
          </Typography>
          <Typography variant="h5" sx={{ color: '#94A3B8', maxWidth: 800 }}>
            Monitor the real-world impact of your contributions through comprehensive 
            tracking tools and transparent reporting systems.
          </Typography>
        </Box>

        {/* Tracking Features */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 4, color: 'white' }}>
            Advanced Tracking Features
          </Typography>
          <Grid container spacing={4}>
            {trackingFeatures.map((feature) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <Card sx={{ 
                  height: '100%',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)',
                    borderColor: '#3B82F6',
                  },
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Avatar sx={{ 
                      backgroundColor: '#3B82F6',
                      color: 'white',
                      width: 60,
                      height: 60,
                      mb: 3
                    }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#94A3B8', mb: 3 }}>
                      {feature.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                      {feature.details}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Tracking Metrics */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 4, color: 'white' }}>
            What We Track
          </Typography>
          <Grid container spacing={3}>
            {trackingMetrics.map((metric) => (
              <Grid item xs={12} md={6} key={metric.title}>
                <Card sx={{ 
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)',
                    borderColor: '#3B82F6',
                  },
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                      {metric.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#94A3B8', mb: 3 }}>
                      {metric.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2, fontWeight: 600 }}>
                      Key metrics:
                    </Typography>
                    <Box component="ul" sx={{ color: '#64748B', pl: 2 }}>
                      {metric.metrics.map((item) => (
                        <Box component="li" key={item} sx={{ mb: 1 }}>
                          {item}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Dashboard Features */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 4, color: 'white' }}>
            Your Tracking Dashboard
          </Typography>
          <Typography variant="h6" sx={{ color: '#94A3B8', mb: 4, maxWidth: 800 }}>
            Access comprehensive tracking tools through your personalized dashboard:
          </Typography>
          <Grid container spacing={3}>
            {dashboardFeatures.map((feature) => (
              <Grid item xs={12} md={3} key={feature.title}>
                <Card sx={{ 
                  height: '100%',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)',
                    borderColor: '#3B82F6',
                  },
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <ChartIcon sx={{ fontSize: 48, color: '#3B82F6', mb: 3 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Benefits */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 4, color: 'white' }}>
            Benefits of Impact Tracking
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)',
                  borderColor: '#3B82F6',
                },
              }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <AnalyticsIcon sx={{ fontSize: 48, color: '#10B981', mb: 3 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                    Data-Driven Decisions
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#94A3B8' }}>
                    Make informed decisions about future contributions based on detailed impact data and analytics.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)',
                  borderColor: '#3B82F6',
                },
              }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <AssessmentIcon sx={{ fontSize: 48, color: '#F59E0B', mb: 3 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                    Accountability
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#94A3B8' }}>
                    Hold project teams accountable for delivering promised outcomes and maintaining transparency.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)',
                  borderColor: '#3B82F6',
                },
              }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <TimelineIcon sx={{ fontSize: 48, color: '#EF4444', mb: 3 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                    Continuous Improvement
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#94A3B8' }}>
                    Identify areas for improvement and optimize project delivery based on tracking insights.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: 'white' }}>
            Start Tracking Impact Today
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', mb: 4, maxWidth: 600, mx: 'auto' }}>
            Get detailed insights into how your contributions are creating real-world impact 
            through our comprehensive tracking and reporting system.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/dashboard')}
              sx={{
                background: 'linear-gradient(135deg, #3B82F6, #1E40AF)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1E40AF, #1E3A8A)',
                },
                px: 4,
                py: 2,
                fontSize: '1.1rem',
              }}
            >
              Access Your Dashboard
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/projects')}
              sx={{
                borderColor: '#3B82F6',
                color: '#3B82F6',
                '&:hover': {
                  borderColor: '#1E40AF',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                },
                px: 4,
                py: 2,
                fontSize: '1.1rem',
              }}
            >
              Browse More Projects
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/verify')}
              sx={{
                borderColor: '#10B981',
                color: '#10B981',
                '&:hover': {
                  borderColor: '#059669',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                },
                px: 4,
                py: 2,
                fontSize: '1.1rem',
              }}
            >
              Learn About Verification
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Track;
