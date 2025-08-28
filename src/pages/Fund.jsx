import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  CurrencyExchange as CurrencyIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon
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

const Fund = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const fundingMethods = [
    {
      icon: <CurrencyIcon />,
      title: "NFT-Based Funding",
      description: "Purchase project-specific NFTs that represent your contribution and provide proof of impact.",
      benefits: [
        "Transparent contribution tracking",
        "Proof of impact ownership",
        "Potential for appreciation",
        "Community recognition"
      ]
    },
    {
      icon: <SecurityIcon />,
      title: "Secure Payment Options",
      description: "Multiple payment methods including cryptocurrency, mobile money, and traditional banking.",
      benefits: [
        "Cryptocurrency payments",
        "Mobile money integration",
        "Bank transfers",
        "International payments"
      ]
    },
    {
      icon: <CheckCircleIcon />,
      title: "Milestone-Based Release",
      description: "Funds are released based on verified project milestones, ensuring accountability.",
      benefits: [
        "Risk mitigation",
        "Progress verification",
        "Community oversight",
        "Transparent fund flow"
      ]
    }
  ];

  const fundingProcess = [
    {
      step: "1",
      title: "Choose a Project",
      description: "Browse and select projects that align with your values and desired impact areas."
    },
    {
      step: "2",
      title: "Select Amount",
      description: "Choose how much you want to contribute based on your budget and desired impact."
    },
    {
      step: "3",
      title: "Make Payment",
      description: "Use your preferred payment method to securely contribute to the project."
    },
    {
      step: "4",
      title: "Receive NFTs",
      description: "Get project-specific NFTs as proof of your contribution and impact ownership."
    }
  ];

  const benefits = [
    {
      title: "Transparency",
      description: "All transactions and fund usage are recorded on the blockchain for complete transparency."
    },
    {
      title: "Accountability",
      description: "Funds are only released when project milestones are verified by the community."
    },
    {
      title: "Impact Tracking",
      description: "Track the real-world impact of your contributions through regular updates and verification."
    },
    {
      title: "Community Governance",
      description: "Participate in decision-making processes through voting rights based on your contributions."
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
            Fund Projects
          </Typography>
          <Typography variant="h5" sx={{ color: '#94A3B8', maxWidth: 800 }}>
            Support community projects through transparent, secure funding mechanisms 
            that ensure your contributions create real impact.
          </Typography>
        </Box>

        {/* Funding Methods */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 4, color: 'white' }}>
            Funding Mechanisms
          </Typography>
          <Grid container spacing={4}>
            {fundingMethods.map((method) => (
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
                    <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2, fontWeight: 600 }}>
                      Benefits:
                    </Typography>
                    <Box component="ul" sx={{ color: '#64748B', pl: 2 }}>
                      {method.benefits.map((benefit) => (
                        <Box component="li" key={benefit} sx={{ mb: 1 }}>
                          {benefit}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Funding Process */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 4, color: 'white' }}>
            How to Fund a Project
          </Typography>
          <Grid container spacing={4}>
            {fundingProcess.map((step) => (
              <Grid item xs={12} md={3} key={step.step}>
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
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        mx: 'auto',
                        mb: 3,
                        backgroundColor: '#10B981',
                        color: 'white',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                      }}
                    >
                      {step.step}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.6 }}>
                      {step.description}
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
            Why Fund Through Changa DAO?
          </Typography>
          <Grid container spacing={3}>
            {benefits.map((benefit) => (
              <Grid item xs={12} md={6} key={benefit.title}>
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
                      {benefit.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#94A3B8', lineHeight: 1.6 }}>
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: 'white' }}>
            Ready to Make an Impact?
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', mb: 4, maxWidth: 600, mx: 'auto' }}>
            Start funding community projects today and become part of a global movement 
            creating positive change through transparent, accountable development.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/Changa_DAO/projects')}
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
            Browse Projects
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Fund;
