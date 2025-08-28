import {
  Agriculture as AgricultureIcon,
  ArrowBack as ArrowBackIcon,
  Business as BusinessIcon,
  Group as GroupIcon,
  LocalHospital as HealthIcon,
  School as SchoolIcon,
  WaterDrop as WaterIcon
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

const Propose = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const proposalSteps = [
    {
      step: "1",
      title: "Community Identification",
      description: "Communities identify pressing needs and opportunities for improvement in their area.",
      details: "Local leaders, community members, and organizations come together to identify the most critical needs affecting their community. This could be access to clean water, better healthcare facilities, educational resources, or infrastructure improvements."
    },
    {
      step: "2", 
      title: "Project Planning",
      description: "Develop comprehensive project proposals with timelines, budgets, and impact metrics.",
      details: "Create detailed project plans including technical specifications, budget breakdown, timeline, expected outcomes, and success metrics. This ensures transparency and accountability in project execution."
    },
    {
      step: "3",
      title: "Stakeholder Engagement", 
      description: "Engage with all relevant stakeholders to ensure community buy-in and support.",
      details: "Work with local government, community leaders, beneficiaries, and other stakeholders to gain support and ensure the project addresses real community needs effectively."
    }
  ];

  const projectCategories = [
    {
      icon: <SchoolIcon />,
      title: "Education",
      examples: ["School construction", "Computer labs", "Library facilities", "Teacher training"]
    },
    {
      icon: <HealthIcon />,
      title: "Healthcare", 
      examples: ["Medical clinics", "Equipment upgrades", "Health awareness programs", "Vaccination drives"]
    },
    {
      icon: <WaterIcon />,
      title: "Water & Sanitation",
      examples: ["Boreholes", "Water purification", "Sanitation facilities", "Irrigation systems"]
    },
    {
      icon: <AgricultureIcon />,
      title: "Agriculture",
      examples: ["Farm training", "Irrigation projects", "Market access", "Storage facilities"]
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
            Propose Projects
          </Typography>
          <Typography variant="h5" sx={{ color: '#94A3B8', maxWidth: 800 }}>
            The first step in the Changa DAO process is for communities to identify and propose 
            projects that will create lasting positive impact.
          </Typography>
        </Box>

        {/* Process Steps */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 4, color: 'white' }}>
            The Proposal Process
          </Typography>
          <Grid container spacing={4}>
            {proposalSteps.map((step) => (
              <Grid item xs={12} md={4} key={step.step}>
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
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 3,
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                      }}
                    >
                      {step.step}
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#94A3B8', mb: 3 }}>
                      {step.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                      {step.details}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Project Categories */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 4, color: 'white' }}>
            Project Categories
          </Typography>
          <Typography variant="h6" sx={{ color: '#94A3B8', mb: 4, maxWidth: 800 }}>
            Communities can propose projects across various categories that address their specific needs:
          </Typography>
          <Grid container spacing={3}>
            {projectCategories.map((category) => (
              <Grid item xs={12} md={6} key={category.title}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar sx={{ 
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        mr: 2
                      }}>
                        {category.icon}
                      </Avatar>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'white' }}>
                        {category.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
                      Example projects:
                    </Typography>
                    <Box component="ul" sx={{ color: '#64748B', pl: 2 }}>
                      {category.examples.map((example) => (
                        <Box component="li" key={example} sx={{ mb: 1 }}>
                          {example}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: 'white' }}>
            Ready to Propose a Project?
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', mb: 4, maxWidth: 600, mx: 'auto' }}>
            Join communities around the world in creating positive change through 
            transparent, community-driven development projects.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/Changa_DAO/dashboard')}
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
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Propose;
