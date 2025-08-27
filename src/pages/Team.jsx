import {
    Business as BusinessIcon,
    Email as EmailIcon,
    GitHub as GitHubIcon,
    Group as GroupIcon,
    LinkedIn as LinkedInIcon,
    Psychology as PsychologyIcon,
    Star as StarIcon,
    Twitter as TwitterIcon,
    Language as WebsiteIcon
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Typography,
    useTheme
} from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
const mirriamPhoto = '/images/team/mirriam.jpg';
const bridgitPhoto = '/images/team/nyambeka-modified.png';

const Team = memo(() => {
  const theme = useTheme();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  const teamMembers = [
    {
      id: 1,
      name: "Bridgit Nyambeka",
      role: "Founder & CEO",
      avatar: bridgitPhoto,
      bio: "Visionary leader in blockchain and social impact, passionate about decentralized governance and community-driven development.",
      expertise: ["Blockchain", "Governance", "Strategy", "Social Impact"],
      social: {
        linkedin: "https://www.linkedin.com/in/bridgit-nyambeka-63b46b345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        twitter: "https://x.com/miabrita?t=Xh049StWkmToNGdLFlHqAg&s=09",
        github: "https://github.com/Miabritacreations",
        email: "nyambekabridgit@gmail.com",
      },
      icon: <BusinessIcon />
    },
          {
        id: 2,
        name: "Mirriam Njeri",
        role: "Founder & Lead Marketer",
        avatar: mirriamPhoto,
        bio: "Marketing expert and community builder with extensive experience in digital marketing and brand development. Passionate about creating meaningful connections and driving engagement in the blockchain space. Leading Changa DAO's marketing strategy and community growth initiatives.",
        expertise: ["Digital Marketing", "Brand Development", "Community Building", "Social Media"],
        social: {
          linkedin: "https://www.linkedin.com/in/mirriam-njeri-13437735a",

          github: "https://github.com/Mirriamnjeri",
          email: " njerimirriam128@gmail.com",
        },
        icon: <BusinessIcon />
      }
  ];



  const SocialButton = ({ href, icon, color }) => (
    <IconButton
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: color,
        backgroundColor: 'rgba(255,255,255,0.1)',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.2)',
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.2s ease',
      }}
    >
      {icon}
    </IconButton>
  );

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <Typography variant="h4" sx={{ mb: 2, color: '#1E40AF' }}>
            Loading Team...
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <LinearProgress sx={{ height: 8, borderRadius: 4 }} />
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ 
          fontWeight: 700, 
          mb: 2,
          background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Meet Our Team
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3, maxWidth: 800, mx: 'auto' }}>
          We're a passionate team of innovators and developers dedicated to building a better future through decentralized governance and social impact.
        </Typography>
        <Paper sx={{ 
          p: 3, 
          backgroundColor: 'rgba(30, 64, 175, 0.1)', 
          border: '1px solid rgba(30, 64, 175, 0.3)',
          borderRadius: 3
        }}>
          <Typography variant="body1" color="text.secondary">
            Our mission is to empower communities through transparent, democratic decision-making and sustainable development initiatives.
          </Typography>
        </Paper>
      </Box>

      {/* Team Grid */}
      <Grid container spacing={4}>
        {teamMembers.map((member) => (
          <Grid item xs={12} md={6} lg={4} key={member.id}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s ease',
                backgroundColor: '#2a2a2a',
                border: '1px solid #3a3a3a',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[8],
                  borderColor: '#1E40AF',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* Avatar and Basic Info */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Avatar
                    src={member.avatar}
                    onLoad={handleImageLoad}
                    loading="lazy"
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      border: '4px solid #1E40AF',
                      transition: 'opacity 0.3s ease',
                      opacity: imagesLoaded ? 1 : 0.7,
                    }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    {member.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    {member.icon}
                    <Typography variant="subtitle1" color="primary" sx={{ ml: 1, fontWeight: 500 }}>
                      {member.role}
                    </Typography>
                  </Box>
                </Box>

                {/* Bio */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {member.bio}
                </Typography>

                {/* Expertise Chips */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'white' }}>
                    Expertise:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {member.expertise.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        variant="outlined"
                                                 sx={{
                           borderColor: '#1E40AF',
                           color: '#1E40AF',
                           backgroundColor: 'rgba(30, 64, 175, 0.1)',
                         }}
                      />
                    ))}
                  </Box>
                </Box>

                <Divider sx={{ my: 2, borderColor: '#3a3a3a' }} />

                {/* Social Links */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  {member.social.linkedin && (
                    <SocialButton
                      href={member.social.linkedin}
                      icon={<LinkedInIcon />}
                      color="#0077B5"
                    />
                  )}
                  {member.social.twitter && (
                    <SocialButton
                      href={member.social.twitter}
                      icon={<TwitterIcon />}
                      color="#1DA1F2"
                    />
                  )}
                  {member.social.github && (
                    <SocialButton
                      href={member.social.github}
                      icon={<GitHubIcon />}
                      color="#333"
                    />
                  )}
                  {member.social.email && (
                    <SocialButton
                      href={`mailto:${member.social.email}`}
                      icon={<EmailIcon />}
                      color="#EA4335"
                    />
                  )}
                  {member.social.website && (
                    <SocialButton
                      href={member.social.website}
                      icon={<WebsiteIcon />}
                      color="#4285F4"
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Values Section */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
          Our Values
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a' }}>
              <StarIcon sx={{ fontSize: 48, color: '#42A5F5', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Excellence
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We strive for excellence in everything we do, from code quality to community engagement.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a' }}>
              <GroupIcon sx={{ fontSize: 48, color: '#42A5F5', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Collaboration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We believe in the power of collaboration and diverse perspectives to solve complex challenges.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a' }}>
              <PsychologyIcon sx={{ fontSize: 48, color: '#42A5F5', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Impact
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We measure our success by the positive impact we create in communities around the world.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Join Us Section */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Paper sx={{ 
          p: 6, 
          backgroundColor: 'rgba(30, 64, 175, 0.1)', 
          border: '1px solid rgba(30, 64, 175, 0.3)',
          borderRadius: 3
        }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Join Our Mission
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
            We're always looking for passionate individuals who share our vision of creating positive change through technology and community.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Get in touch at <strong>hello@changadao.org</strong> to learn about opportunities to contribute.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
});

export default Team;
