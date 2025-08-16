import {
    CheckCircle as CheckIcon,
    Fund as FundIcon,
    Launch as LaunchIcon,
    People as PeopleIcon,
    Security as SecurityIcon,
    AccountBalance as TreasuryIcon,
    Verified as VerifiedIcon
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Mwangi",
      role: "CEO & Co-Founder",
      bio: "Former NGO director with 15+ years in international development",
      avatar: "SM",
      linkedin: "#",
    },
    {
      name: "John Ochieng",
      role: "CTO & Co-Founder",
      bio: "Blockchain developer and former Google engineer",
      avatar: "JO",
      linkedin: "#",
    },
    {
      name: "Mary Akinyi",
      role: "Head of Impact",
      bio: "Social impact measurement expert with PhD in Development Economics",
      avatar: "MA",
      linkedin: "#",
    },
    {
      name: "David Odhiambo",
      role: "Head of Operations",
      bio: "Former UN operations manager with expertise in project delivery",
      avatar: "DO",
      linkedin: "#",
    },
  ];

  const partnerships = [
    {
      name: "United Nations Development Programme",
      type: "NGO",
      description: "Strategic partnership for sustainable development projects",
      logo: "UNDP",
    },
    {
      name: "Kenya Ministry of Water",
      type: "Government",
      description: "Official partnership for water infrastructure projects",
      logo: "KMW",
    },
    {
      name: "Greenpeace Africa",
      type: "Environmental NGO",
      description: "Collaboration on environmental impact projects",
      logo: "GPA",
    },
    {
      name: "World Bank",
      type: "International Organization",
      description: "Funding and technical support partnership",
      logo: "WB",
    },
  ];

  const securityFeatures = [
    {
      title: "Smart Contract Audits",
      description: "All smart contracts undergo rigorous third-party security audits",
      icon: <SecurityIcon />,
    },
    {
      title: "Geo-Proof Verification",
      description: "Blockchain-based location verification for project authenticity",
      icon: <VerifiedIcon />,
    },
    {
      title: "DAO Governance",
      description: "Decentralized decision-making ensures community control",
      icon: <PeopleIcon />,
    },
    {
      title: "Transparent Treasury",
      description: "All funds are publicly visible on the blockchain",
      icon: <TreasuryIcon />,
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 16 },
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "4rem" },
                lineHeight: 1.2,
                mb: 3,
              }}
            >
              About Changa DAO
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontWeight: 400,
                lineHeight: 1.4,
                maxWidth: 800,
                mx: "auto",
              }}
            >
              We're building the future of impact investing through decentralized governance,
              transparent funding, and measurable social returns.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
              Our Mission
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, lineHeight: 1.6 }}>
              To democratize impact investing by connecting global investors with local communities
              through transparent, blockchain-powered funding mechanisms.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
              We believe that everyone should have the opportunity to invest in projects that create
              positive social and environmental impact. By leveraging blockchain technology and
              decentralized governance, we're making impact investing accessible, transparent, and
              accountable.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<FundIcon />}
                component={Link}
                to="/projects"
                sx={{ borderRadius: 2, px: 4 }}
              >
                Fund a Project
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<LaunchIcon />}
                sx={{ borderRadius: 2, px: 4 }}
              >
                Launch a Project
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 4,
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                borderRadius: 4,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: "primary.main" }}>
                Our Vision
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                A world where impact investing is the norm, not the exception. Where communities
                have direct access to global capital, and investors can see real-time impact
                of their investments.
              </Typography>
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="Democratized access to impact investing" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="Transparent and accountable funding" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="Measurable social and environmental impact" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="Community-driven decision making" />
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Our Team
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
              Meet the passionate individuals driving change through technology and social impact
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: "100%", textAlign: "center" }}>
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        mx: "auto",
                        mb: 3,
                        bgcolor: "primary.main",
                        fontSize: "2rem",
                      }}
                    >
                      {member.avatar}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body1" color="primary.main" sx={{ fontWeight: 600, mb: 2 }}>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Partnerships Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Our Partnerships
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
            Working with leading organizations to maximize our impact
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {partnerships.map((partner, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: "100%", p: 3, textAlign: "center" }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mx: "auto",
                    mb: 2,
                    bgcolor: "primary.main",
                    fontSize: "1.2rem",
                  }}
                >
                  {partner.logo}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {partner.name}
                </Typography>
                <Chip
                  label={partner.type}
                  size="small"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {partner.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Security & Transparency */}
      <Box sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Security & Transparency
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: "auto" }}>
              Building trust through technology and accountability
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {securityFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    p: 3,
                    textAlign: "center",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      color: "white",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Paper
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 4,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
            Ready to Make a Difference?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of investors who are already funding impactful projects
            and earning returns while changing lives.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<FundIcon />}
              component={Link}
              to="/projects"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.3)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Fund a Project
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<LaunchIcon />}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                borderColor: "rgba(255, 255, 255, 0.5)",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  background: "rgba(255, 255, 255, 0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Launch a Project
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* Footer Info */}
      <Box sx={{ background: "rgba(0,0,0,0.05)", py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Contact Us
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Email: hello@changadao.org
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Phone: +254 700 000 000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Address: Nairobi, Kenya
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Legal
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Terms of Service
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Privacy Policy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Whitepaper
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Follow Us
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Twitter: @ChangaDAO
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                LinkedIn: Changa DAO
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Discord: Changa DAO Community
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
