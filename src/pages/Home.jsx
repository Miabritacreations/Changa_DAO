import {
  Agriculture as AgricultureIcon,
  Email as EmailIcon,
  Group as GroupIcon,
  LocalHospital as HealthIcon,
  School as SchoolIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as TrophyIcon,
  Verified as VerifiedIcon,
  WaterDrop as WaterIcon
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  LinearProgress,
  Typography,
  useTheme
} from "@mui/material";
import React from "react";
import { getBackendActor } from "../api/canister";

const Home = () => {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const theme = useTheme();

  React.useEffect(() => {
    (async () => {
      try {
        const backend = await getBackendActor();
        const list = await backend.getProposals();
        if (!list || list.length === 0) {
          setProjects([
            { id: 1n, title: 'Solar Power for Rural Clinics', description: 'Install solar panels to power medical equipment in 3 clinics serving 10,000 people.', status: 'Active', category: 'Healthcare', raised: 28000, goal: 35000, percent: 80 },
            { id: 2n, title: 'Digital Learning Center', description: 'Modern computer lab and digital literacy program for underserved students.', status: 'Active', category: 'Education', raised: 12000, goal: 15000, percent: 80 },
            { id: 3n, title: 'Clean Water for Village', description: 'Build a sustainable water system with purification for 500 families.', status: 'Active', category: 'Water', raised: 18750, goal: 25000, percent: 75 },
            { id: 4n, title: 'Community Health Outreach', description: 'Mobile health screenings and vaccinations across rural wards.', status: 'Passed', category: 'Health', raised: 6000, goal: 6000, percent: 100 },
            { id: 5n, title: 'Irrigation for Smallholders', description: 'Low-cost drip irrigation to increase farm yields by 40%.', status: 'Active', category: 'Agriculture', raised: 9000, goal: 20000, percent: 45 },
          ]);
        } else {
          setProjects(list);
        }
      } catch (_e) {
        setProjects([
          { id: 1n, title: 'Solar Power for Rural Clinics', description: 'Install solar panels to power medical equipment in 3 clinics serving 10,000 people.', status: 'Active', category: 'Healthcare', raised: 28000, goal: 35000, percent: 80 },
          { id: 2n, title: 'Digital Learning Center', description: 'Modern computer lab and digital literacy program for underserved students.', status: 'Active', category: 'Education', raised: 12000, goal: 15000, percent: 80 },
          { id: 3n, title: 'Clean Water for Village', description: 'Build a sustainable water system with purification for 500 families.', status: 'Active', category: 'Water', raised: 18750, goal: 25000, percent: 75 },
          { id: 4n, title: 'Community Health Outreach', description: 'Mobile health screenings and vaccinations across rural wards.', status: 'Passed', category: 'Health', raised: 6000, goal: 6000, percent: 100 },
          { id: 5n, title: 'Irrigation for Smallholders', description: 'Low-cost drip irrigation to increase farm yields by 40%.', status: 'Active', category: 'Agriculture', raised: 9000, goal: 20000, percent: 45 },
        ]);
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
        return <TrophyIcon />;
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

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ maxWidth: 800, mb: 6 }}>
            <Chip
              label="Decentralized Impact Funding"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                mb: 3,
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Build, fund, and verify real‑world social projects with transparency
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontWeight: 400,
              }}
            >
              Changa DAO turns schools, boreholes, and clinics into verifiable, milestone‑funded, community‑governed projects.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                }}
              >
                Launch App
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                How it works
              </Button>
            </Box>
          </Box>

          {/* Stats Grid */}
          <Grid container spacing={3}>
            {[
              { label: 'Total Members', value: '1,240+', icon: <GroupIcon /> },
              { label: 'Projects Funded', value: '86', icon: <TrophyIcon /> },
              { label: 'Treasury', value: '$1.2M', icon: <TrendingUpIcon /> },
              { label: 'Communities Reached', value: '42', icon: <VerifiedIcon /> },
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Box sx={{ mb: 1, opacity: 0.8 }}>{stat.icon}</Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ maxWidth: 800, mb: 8 }}>
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 700 }}>
            About Changa DAO
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.6 }}>
            Changa DAO is a blockchain-powered crowdfunding platform that helps communities bring real-world social projects to life.
            From schools and boreholes to health clinics, we enable communities to raise funds transparently, track progress with
            geo-tagged proof, and release funds milestone by milestone.
          </Typography>
        </Box>

        {/* Mission & Vision */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                  To empower communities to build sustainable social projects by creating a trusted, transparent,
                  and decentralized funding ecosystem that puts impact first.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                  A world where every community has the resources to create lasting change—powered by transparency,
                  collaboration, and blockchain innovation.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Values */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
            Our Values
          </Typography>
          <Grid container spacing={3}>
            {[
              { title: 'Transparency', description: 'Every transaction and milestone is verifiable on-chain', icon: <VerifiedIcon /> },
              { title: 'Community Ownership', description: 'Local stakeholders govern their own projects through DAO voting', icon: <GroupIcon /> },
              { title: 'Accountability', description: 'Funds are released only when milestones are verified', icon: <SecurityIcon /> },
              { title: 'Impact First', description: 'Every project must create tangible benefits for people on the ground', icon: <TrophyIcon /> },
              { title: 'Sustainability', description: 'We focus on solutions that last for generations, not just quick fixes', icon: <TrendingUpIcon /> },
            ].map((value, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 2, color: 'primary.main' }}>{value.icon}</Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* How It Works */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
            How It Works
          </Typography>
          <Grid container spacing={4}>
            {[
              { step: '1', title: 'Propose', description: 'Communities propose projects (schools, boreholes, clinics…)', icon: <GroupIcon /> },
              { step: '2', title: 'Fund', description: 'Fundraising via NFTs (donors & investors get proof tokens)', icon: <TrendingUpIcon /> },
              { step: '3', title: 'Verify', description: 'Milestone-based funding (funds released only after verification)', icon: <VerifiedIcon /> },
              { step: '4', title: 'Track', description: 'Impact tracking with geo-tagged media + transparent dashboards', icon: <SecurityIcon /> },
            ].map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center', position: 'relative' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        fontSize: '1.5rem',
                        fontWeight: 700,
                      }}
                    >
                      {step.step}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Projects */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Featured Projects
            </Typography>
            <Button variant="outlined" color="primary">
              View all projects
            </Button>
          </Box>

          {loading ? (
            <Typography>Loading projects...</Typography>
          ) : (
            <Grid container spacing={3}>
              {projects.slice(0, 4).map((project) => (
                <Grid item xs={12} md={6} key={Number(project.id)}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <Box sx={{ color: 'primary.main' }}>
                            {getCategoryIcon(project.category)}
                          </Box>
                          <Chip
                            label={project.category}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                        <Chip
                          label={variantToString(project.status)}
                          color={getStatusColor(project.status)}
                          size="small"
                        />
                      </Box>

                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        {project.title}
                      </Typography>

                      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                        {project.description}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Progress
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {(project.percent || 0)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={project.percent || 0}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          ${project.raised?.toLocaleString()} raised
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Goal: ${project.goal?.toLocaleString()}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                question: 'What is Changa DAO?',
                answer: 'A platform that combines crowdfunding, blockchain, and DAO governance to fund real-world community projects.'
              },
              {
                question: 'How do I fund a project?',
                answer: 'Choose a project, connect your wallet (or use mobile money/fiat), and purchase NFTs to contribute.'
              },
              {
                question: 'Can I invest without crypto knowledge?',
                answer: 'Yes! We support mobile-friendly wallets, fiat payments, and easy onboarding for non-crypto users.'
              },
              {
                question: 'How are projects verified?',
                answer: 'Through geo-tagged photos/videos, DAO votes, and milestone-based smart contracts.'
              },
              {
                question: 'What returns can I expect?',
                answer: 'Donors receive proof-of-impact NFTs. Investors in revenue-generating projects receive revenue shares or tokenized returns.'
              },
            ].map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {faq.question}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Card sx={{ p: 6, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
              Ready to Make an Impact?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of changemakers funding real-world projects
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                }}
              >
                Launch App
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
                startIcon={<EmailIcon />}
              >
                Contact Us
              </Button>
            </Box>
            <Typography variant="body2" sx={{ mt: 3, opacity: 0.8 }}>
              📧 hello@changadao.org | 🌍 Twitter | LinkedIn | Telegram
            </Typography>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;


