import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  Card,
  CardContent,
  Container,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  useTheme,
  Paper
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Verified as VerifiedIcon,
  Security as SecurityIcon,
  AccountCircle as AccountCircleIcon
} from "@mui/icons-material";
import { getUserProfile, updateUserProfile } from "../api/profile";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({ name: "", email: "", avatar: "", bio: "", location: "", phone: "", organization: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const theme = useTheme();

  console.log('UserProfile component loaded');

  useEffect(() => {
    getUserProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  const handleEditOpen = () => {
    setEdit({
      name: profile.name || "",
      email: profile.email || "",
      avatar: profile.avatar || "",
      bio: profile.bio || "",
      location: profile.location || "",
      phone: profile.phone || "",
      organization: profile.organization || ""
    });
    setOpen(true);
  };

  const handleEditClose = () => setOpen(false);
  
  const handleChange = (e) => setEdit({ ...edit, [e.target.name]: e.target.value });
  
  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateUserProfile(edit);
      setProfile(updated);
      setSaving(false);
      setOpen(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Profile
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your account information and preferences
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Avatar
                src={profile.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 3,
                  border: '4px solid',
                  borderColor: 'primary.main',
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 60 }} />
              </Avatar>
              
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {profile.name || 'User Name'}
              </Typography>
              
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {profile.email || 'user@example.com'}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                <Chip
                  icon={<VerifiedIcon />}
                  label="Verified Member"
                  color="success"
                  size="small"
                />
                <Chip
                  icon={<SecurityIcon />}
                  label="Internet Identity"
                  color="primary"
                  size="small"
                />
              </Box>

              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEditOpen}
                fullWidth
                sx={{
                  background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1E88E5, #1565C0)',
                  },
                }}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Profile Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PersonIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Full Name
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {profile.name || 'Not specified'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Email Address
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {profile.email || 'Not specified'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Location
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {profile.location || 'Not specified'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Phone Number
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {profile.phone || 'Not specified'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <BusinessIcon sx={{ mr: 2, color: 'primary.main', mt: 0.5 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Organization
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {profile.organization || 'Not specified'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <PersonIcon sx={{ mr: 2, color: 'primary.main', mt: 0.5 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Bio
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {profile.bio || 'No bio provided'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Activity Stats */}
          <Card sx={{ mt: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Activity Overview
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      12
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Proposals Voted
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                      8
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Projects Funded
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                      156
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
      <Dialog open={open} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Edit Profile
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Full Name"
              name="name"
              value={edit.name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Email Address"
              name="email"
              value={edit.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              type="email"
            />
            <TextField
              label="Avatar URL"
              name="avatar"
              value={edit.avatar}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              helperText="Enter a valid image URL"
            />
            <TextField
              label="Location"
              name="location"
              value={edit.location}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={edit.phone}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Organization"
              name="organization"
              value={edit.organization}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
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
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleEditClose}
            disabled={saving}
            startIcon={<CancelIcon />}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={16} /> : <SaveIcon />}
            sx={{
              background: 'linear-gradient(135deg, #42A5F5, #1E88E5)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1E88E5, #1565C0)',
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