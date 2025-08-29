import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  LocationOn as LocationIcon,
  Security as SecurityIcon,
  VerifiedUser as VerifiedIcon
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

const Verify = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const verificationMethods = [
    {
      icon: <LocationIcon />,
      title: "Geo-Tagged Verification",
      description: "All project milestones are verified through GPS-tagged photos and videos to ensure authenticity.",
      details: "Project teams upload location-verified media showing progress and completion of milestones. This provides irrefutable proof of project execution."
    },
    {
      icon: <VerifiedIcon />,
      title: "Community Verification",
      description: "Local community members and stakeholders verify project progress and outcomes.",
      details: "Community representatives review and confirm that project milestones have been completed as specified, ensuring local accountability."
    },
    {
      icon: <SecurityIcon />,
      title: "Smart Contract Governance",
      description: "Funds are automatically released only after milestone verification is approved by the DAO.",
      details: "Smart contracts ensure that funds are only disbursed when verification criteria are met, preventing fraud and ensuring transparency."
    }
  ];

  const verificationProcess = [
    {
      step: "1",
      title: "Milestone Completion",
      description: "Project teams complete defined milestones and submit verification evidence."
    },
    {
      step: "2",
      title: "Evidence Submission",
      description: "Upload geo-tagged photos, videos, and documentation showing milestone completion."
    },
    {
      step: "3",
      title: "Community Review",
      description: "Local stakeholders and community members review the submitted evidence."
    },
    {
      step: "4",
      title: "DAO Voting",
      description: "DAO members vote on whether to approve the milestone and release funds."
    },
    {
      step: "5",
      title: "Fund Release",
      description: "If approved, funds are automatically released for the next project phase."
    }
  ];

  const verificationCriteria = [
    {
      title: "Physical Evidence",
      description: "Photos and videos showing actual project implementation and completion."
    },
    {
      title: "Location Verification",
      description: "GPS coordinates confirming work was done at the specified project location."
    },
    {
      title: "Community Feedback",
      description: "Input from local community members confirming project benefits and completion."
    },
    {
      title: "Technical Standards",
      description: "Verification that work meets technical specifications and quality standards."
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
            Verify Progress
          </Typography>
          <Typography variant="h5" sx={{ color: '#94A3B8', maxWidth: 800 }}>
            Our multi-layered verification system ensures that every project milestone 
            is completed transparently and funds are used effectively.
          </Typography>
        </Box>

        {/* Verification Methods */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 4, color: 'white' }}>
            Verification Mechanisms
          </Typography>
          <Grid container spacing={4}>
            {verificationMethods.map((method) => (
              <Grid item xs={12} md={4} key={method.title}>
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
                      {method.icon}
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                      {method.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#94A3B8', mb: 3 }}>
                      {method.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                      {method.details}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Verification Process */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 4, color: 'white' }}>
            The Verification Process
          </Typography>
          <Grid container spacing={3}>
            {verificationProcess.map((step) => (
              <Grid item xs={12} md={2.4} key={step.step}>
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
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        width: 45,
                        height: 45,
                        mx: 'auto',
                        mb: 2,
                        backgroundColor: '#10B981',
                        color: 'white',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                      }}
                    >
                      {step.step}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'white', fontSize: '0.9rem' }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: '0.8rem', lineHeight: 1.4 }}>
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Verification Criteria */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 4, color: 'white' }}>
            Verification Criteria
          </Typography>
          <Typography variant="h6" sx={{ color: '#94A3B8', mb: 4, maxWidth: 800 }}>
            Each project milestone must meet these criteria before funds are released:
          </Typography>
          <Grid container spacing={3}>
            {verificationCriteria.map((criterion) => (
              <Grid item xs={12} md={6} key={criterion.title}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CheckCircleIcon sx={{ color: '#10B981', mr: 2, fontSize: 28 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
                        {criterion.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#94A3B8', lineHeight: 1.6 }}>
                      {criterion.description}
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
            Benefits of Our Verification System
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
                  <SecurityIcon sx={{ fontSize: 48, color: '#3B82F6', mb: 3 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                    Fraud Prevention
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#94A3B8' }}>
                    Multiple verification layers prevent fraud and ensure funds are used for their intended purpose.
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
                  <VerifiedIcon sx={{ fontSize: 48, color: '#10B981', mb: 3 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                    Quality Assurance
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#94A3B8' }}>
                    Rigorous verification ensures that projects meet quality standards and deliver expected outcomes.
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
                  <CheckCircleIcon sx={{ fontSize: 48, color: '#F59E0B', mb: 3 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                    Community Trust
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#94A3B8' }}>
                    Transparent verification builds trust between funders, communities, and project teams.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: 'white' }}>
            Trust in Transparency
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', mb: 4, maxWidth: 600, mx: 'auto' }}>
            Our verification system ensures that every contribution creates real, measurable impact 
            through transparent and accountable project execution.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/projects')}
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
              View Verified Projects
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/dashboard')}
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
              Go to Dashboard
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/track')}
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
              Track Progress
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Verify;
