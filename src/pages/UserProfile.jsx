import {
  AccountCircle as AccountCircleIcon,
  Business as BusinessIcon,
  PhotoCamera as CameraIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  GitHub as GitHubIcon,
  Favorite as InterestsIcon,
  LinkedIn as LinkedInIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Save as SaveIcon,
  Security as SecurityIcon,
  Star as SkillsIcon,
  Twitter as TwitterIcon,
  Verified as VerifiedIcon,
  Language as WebsiteIcon
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../api/profile";
import { useAuth } from "../contexts/AuthContext";

const UserProfile = () => {
  const { isAuthenticated, handleLogout: authLogout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({
    name: "",
    email: "",
    avatar: "",
    bio: "",
    location: "",
    phone: "",
    organization: "",
    website: "",
    linkedin: "",
    twitter: "",
    github: "",
    education: "",
    skills: "",
    interests: "",
    showEmail: true,
    showPhone: true,
    showLocation: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const theme = useTheme();

  console.log('UserProfile component loaded');

  useEffect(() => {
    loadProfile();
  }, [isAuthenticated]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!isAuthenticated) {
        // Show default profile for unauthenticated users
        setProfile({
          name: "Guest User",
          email: "guest@example.com",
          avatar: "https://i.pravatar.cc/150?u=guest",
          bio: "Please connect your Internet Identity to view your profile.",
          location: "",
          phone: "",
          organization: "",
          website: "",
          linkedin: "",
          twitter: "",
          github: "",
          education: "",
          skills: "",
          interests: "",
          showEmail: true,
          showPhone: true,
          showLocation: true,
          principal: null
        });
        return;
      }

      const userProfile = await getUserProfile();
      setProfile(userProfile);
    } catch (error) {
      console.error('Failed to load profile:', error);
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditOpen = () => {
    if (!isAuthenticated) {
      setError('Please connect your Internet Identity to edit your profile.');
      return;
    }
    
    setEdit({
      name: profile?.name || "",
      email: profile?.email || "",
      avatar: profile?.avatar || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
      phone: profile?.phone || "",
      organization: profile?.organization || "",
      website: profile?.website || "",
      linkedin: profile?.linkedin || "",
      twitter: profile?.twitter || "",
      github: profile?.github || "",
      education: profile?.education || "",
      skills: profile?.skills || "",
      interests: profile?.interests || "",
      showEmail: profile?.showEmail ?? true,
      showPhone: profile?.showPhone ?? true,
      showLocation: profile?.showLocation ?? true
    });
    setError(null);
    setSuccess(null);
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
    setError(null);
    setSuccess(null);
  };

  const handleLogout = async () => {
    try {
      await authLogout();
      await loadProfile();
      setSuccess('Successfully logged out');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Logout error:', error);
      setError('Logout failed. Please try again.');
    }
  };
  
  const handleChange = (e) => setEdit({ ...edit, [e.target.name]: e.target.value });
  
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Validate required fields
      if (!edit.name.trim()) {
        throw new Error('Name is required');
      }
      if (!edit.email.trim()) {
        throw new Error('Email is required');
      }
      if (edit.email && !/\S+@\S+\.\S+/.test(edit.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Process avatar if uploaded
      let avatarUrl = edit.avatar;
      if (avatarFile) {
        // In a real app, you'd upload to IPFS or cloud storage
        avatarUrl = avatarPreview;
      }

      const updatedProfile = {
        ...edit,
        avatar: avatarUrl,
        updatedAt: Date.now()
      };

      const updated = await updateUserProfile(updatedProfile);
      setProfile(updated);
      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        setOpen(false);
        setSuccess(null);
      }, 1500);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, backgroundColor: '#0F172A', minHeight: '100vh', color: 'white' }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <CircularProgress sx={{ color: '#3B82F6' }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, backgroundColor: '#0F172A', minHeight: '100vh', color: 'white' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
          Profile
        </Typography>
        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
          Manage your account information and preferences
        </Typography>
      </Box>

      {/* Demo Mode Alert */}
      {!isAuthenticated && (
        <Alert severity="info" sx={{ mb: 4, backgroundColor: '#1E293B', border: '1px solid #334155', color: '#94A3B8' }}>
          <AlertTitle>Demo Mode</AlertTitle>
          You're viewing a demo profile. Click "Connect to Edit" to authenticate with Internet Identity and access your real profile.
        </Alert>
      )}

      {/* Authentication Success Alert */}
      {isAuthenticated && success && (
        <Alert severity="success" sx={{ mb: 4, backgroundColor: '#1E293B', border: '1px solid #334155', color: '#94A3B8' }}>
          <AlertTitle>Successfully Connected!</AlertTitle>
          You're now authenticated with Internet Identity. You can edit your profile.
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'fit-content', backgroundColor: '#1E293B', border: '1px solid #334155' }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                <Avatar
                  src={avatarPreview || profile?.avatar}
                  sx={{
                    width: 120,
                    height: 120,
                    border: '4px solid #3B82F6',
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 60 }} />
                </Avatar>
                {isAuthenticated && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: '#3B82F6',
                      color: 'white',
                      '&:hover': { backgroundColor: '#1E40AF' },
                    }}
                    onClick={() => document.getElementById('avatar-input').click()}
                  >
                    <CameraIcon />
                  </IconButton>
                )}
                <input
                  id="avatar-input"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
              </Box>
              
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: 'white' }}>
                {profile?.name || 'User Name'}
              </Typography>
              
              <Typography sx={{ color: '#94A3B8', mb: 2 }}>
                {profile?.email || 'user@example.com'}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                <Chip
                  icon={<VerifiedIcon />}
                  label={isAuthenticated ? "Verified Member" : "Demo User"}
                  color={isAuthenticated ? "success" : "default"}
                  size="small"
                  sx={{ 
                    backgroundColor: isAuthenticated ? 'rgba(16, 185, 129, 0.1)' : 'rgba(148, 163, 184, 0.1)', 
                    color: isAuthenticated ? '#10B981' : '#94A3B8' 
                  }}
                />
                <Chip
                  icon={<SecurityIcon />}
                  label={isAuthenticated ? "Internet Identity" : "Not Connected"}
                  color={isAuthenticated ? "primary" : "default"}
                  size="small"
                  sx={{ 
                    backgroundColor: isAuthenticated ? 'rgba(59, 130, 246, 0.1)' : 'rgba(148, 163, 184, 0.1)', 
                    color: isAuthenticated ? '#3B82F6' : '#94A3B8' 
                  }}
                />
              </Box>

              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEditOpen}
                fullWidth
                disabled={loading}
                sx={{
                  background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1E3A8A, #1E40AF)',
                  },
                  '&.Mui-disabled': {
                    background: '#334155',
                    color: '#64748B',
                  },
                  mb: 2,
                }}
              >
                {loading ? 'Connecting...' : isAuthenticated ? 'Edit Profile' : 'Connect to Edit'}
              </Button>

              {isAuthenticated && (
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  fullWidth
                  sx={{
                    borderColor: '#EF4444',
                    color: '#EF4444',
                    '&:hover': {
                      borderColor: '#DC2626',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    },
                  }}
                >
                  Logout
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'white' }}>
                Profile Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PersonIcon sx={{ mr: 2, color: '#3B82F6' }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                        Full Name
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: 'white' }}>
                        {profile?.name || 'Not specified'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmailIcon sx={{ mr: 2, color: '#3B82F6' }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                        Email Address
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: 'white' }}>
                        {profile?.showEmail ? (profile?.email || 'Not specified') : 'Hidden'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationIcon sx={{ mr: 2, color: '#3B82F6' }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                        Location
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: 'white' }}>
                        {profile?.showLocation ? (profile?.location || 'Not specified') : 'Hidden'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ mr: 2, color: '#3B82F6' }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                        Phone Number
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: 'white' }}>
                        {profile?.showPhone ? (profile?.phone || 'Not specified') : 'Hidden'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <BusinessIcon sx={{ mr: 2, color: '#3B82F6', mt: 0.5 }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                        Organization
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: 'white' }}>
                        {profile?.organization || 'Not specified'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <PersonIcon sx={{ mr: 2, color: '#3B82F6', mt: 0.5 }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                        Bio
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: 'white' }}>
                        {profile?.bio || 'No bio provided'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Social Links */}
                {(profile?.website || profile?.linkedin || profile?.twitter || profile?.github) && (
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2, borderColor: '#334155' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                      Social Links
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {profile?.website && (
                        <Chip
                          icon={<WebsiteIcon />}
                          label="Website"
                          variant="outlined"
                          sx={{ borderColor: '#475569', color: '#94A3B8' }}
                        />
                      )}
                      {profile?.linkedin && (
                        <Chip
                          icon={<LinkedInIcon />}
                          label="LinkedIn"
                          variant="outlined"
                          sx={{ borderColor: '#475569', color: '#94A3B8' }}
                        />
                      )}
                      {profile?.twitter && (
                        <Chip
                          icon={<TwitterIcon />}
                          label="Twitter"
                          variant="outlined"
                          sx={{ borderColor: '#475569', color: '#94A3B8' }}
                        />
                      )}
                      {profile?.github && (
                        <Chip
                          icon={<GitHubIcon />}
                          label="GitHub"
                          variant="outlined"
                          sx={{ borderColor: '#475569', color: '#94A3B8' }}
                        />
                      )}
                    </Box>
                  </Grid>
                )}

                {/* Skills & Interests */}
                {(profile?.skills || profile?.interests) && (
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2, borderColor: '#334155' }} />
                    <Grid container spacing={2}>
                      {profile?.skills && (
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <SkillsIcon sx={{ mr: 2, color: '#3B82F6', mt: 0.5 }} />
                            <Box>
                              <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                                Skills
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 500, color: 'white' }}>
                                {profile?.skills}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      )}
                      {profile?.interests && (
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <InterestsIcon sx={{ mr: 2, color: '#3B82F6', mt: 0.5 }} />
                            <Box>
                              <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                                Interests
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 500, color: 'white' }}>
                                {profile?.interests}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>

          {/* Activity Stats */}
          <Card sx={{ mt: 3, backgroundColor: '#1E293B', border: '1px solid #334155' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'white' }}>
                Activity Overview
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#3B82F6' }}>
                      12
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                      Proposals Voted
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#10B981' }}>
                      8
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                      Projects Funded
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#F97316' }}>
                      156
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                      Days Active
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog 
        open={open} 
        onClose={handleEditClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: 3,
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, borderBottom: '1px solid #334155' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
            Edit Profile
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3, backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444', color: '#FCA5A5' }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 3, backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10B981', color: '#6EE7B7' }}>
              {success}
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                Basic Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name *"
                name="name"
                value={edit.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#334155',
                    },
                    '&:hover fieldset': {
                      borderColor: '#475569',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94A3B8',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email Address *"
                name="email"
                value={edit.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                type="email"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#334155',
                    },
                    '&:hover fieldset': {
                      borderColor: '#475569',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94A3B8',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                name="location"
                value={edit.location}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#334155',
                    },
                    '&:hover fieldset': {
                      borderColor: '#475569',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94A3B8',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phone"
                value={edit.phone}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#334155',
                    },
                    '&:hover fieldset': {
                      borderColor: '#475569',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94A3B8',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Organization"
                name="organization"
                value={edit.organization}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#334155',
                    },
                    '&:hover fieldset': {
                      borderColor: '#475569',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94A3B8',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Bio"
                name="bio"
                value={edit.bio}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                helperText="Tell us about yourself"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#334155',
                    },
                    '&:hover fieldset': {
                      borderColor: '#475569',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94A3B8',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#64748B',
                  },
                }}
              />
            </Grid>

            {/* Social Links */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2, borderColor: '#334155' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                Social Links
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Website"
                name="website"
                value={edit.website}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WebsiteIcon sx={{ color: '#94A3B8' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#334155',
                    },
                    '&:hover fieldset': {
                      borderColor: '#475569',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94A3B8',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="LinkedIn"
                name="linkedin"
                value={edit.linkedin}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkedInIcon sx={{ color: '#94A3B8' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#334155',
                    },
                    '&:hover fieldset': {
                      borderColor: '#475569',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94A3B8',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Twitter"
                name="twitter"
                value={edit.twitter}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TwitterIcon sx={{ color: '#94A3B8' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#334155',
                    },
                    '&:hover fieldset': {
                      borderColor: '#475569',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94A3B8',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="GitHub"
                name="github"
                value={edit.github}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GitHubIcon sx={{ color: '#94A3B8' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#334155',
                    },
                    '&:hover fieldset': {
                      borderColor: '#475569',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94A3B8',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Grid>

            {/* Skills & Interests */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2, borderColor: '#334155' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                Skills & Interests
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Skills"
                name="skills"
                value={edit.skills}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                helperText="e.g., React, TypeScript, Blockchain"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SkillsIcon sx={{ color: '#94A3B8' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#334155',
                    },
                    '&:hover fieldset': {
                      borderColor: '#475569',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94A3B8',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#64748B',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Interests"
                name="interests"
                value={edit.interests}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                helperText="e.g., DeFi, Community Building"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InterestsIcon sx={{ color: '#94A3B8' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#334155',
                    },
                    '&:hover fieldset': {
                      borderColor: '#475569',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94A3B8',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#64748B',
                  },
                }}
              />
            </Grid>

            {/* Privacy Settings */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2, borderColor: '#334155' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                Privacy Settings
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={edit.showEmail}
                    onChange={(e) => setEdit({ ...edit, showEmail: e.target.checked })}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#3B82F6',
                        '&:hover': {
                          backgroundColor: 'rgba(59, 130, 246, 0.08)',
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#3B82F6',
                      },
                    }}
                  />
                }
                label="Show Email"
                sx={{ color: '#94A3B8' }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={edit.showPhone}
                    onChange={(e) => setEdit({ ...edit, showPhone: e.target.checked })}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#3B82F6',
                        '&:hover': {
                          backgroundColor: 'rgba(59, 130, 246, 0.08)',
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#3B82F6',
                      },
                    }}
                  />
                }
                label="Show Phone"
                sx={{ color: '#94A3B8' }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={edit.showLocation}
                    onChange={(e) => setEdit({ ...edit, showLocation: e.target.checked })}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#3B82F6',
                        '&:hover': {
                          backgroundColor: 'rgba(59, 130, 246, 0.08)',
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#3B82F6',
                      },
                    }}
                  />
                }
                label="Show Location"
                sx={{ color: '#94A3B8' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 1, borderTop: '1px solid #334155' }}>
          <Button
            onClick={handleEditClose}
            disabled={saving}
            startIcon={<CancelIcon />}
            variant="outlined"
            sx={{
              borderColor: '#475569',
              color: '#94A3B8',
              '&:hover': {
                borderColor: '#64748B',
                backgroundColor: 'rgba(148, 163, 184, 0.1)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={16} /> : <SaveIcon />}
            sx={{
              background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1E3A8A, #1E40AF)',
              },
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserProfile; 