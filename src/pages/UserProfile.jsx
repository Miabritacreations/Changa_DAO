import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Stack, CircularProgress } from "@mui/material";
import { getUserProfile, updateUserProfile } from "../api/profile";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({ name: "", email: "", avatar: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getUserProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  const handleEditOpen = () => {
    setEdit(profile);
    setOpen(true);
  };
  const handleEditClose = () => setOpen(false);
  const handleChange = (e) => setEdit({ ...edit, [e.target.name]: e.target.value });
  const handleSave = async () => {
    setSaving(true);
    const updated = await updateUserProfile(edit);
    setProfile(updated);
    setSaving(false);
    setOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Stack spacing={2} alignItems="center">
        <Avatar src={profile.avatar} sx={{ width: 80, height: 80 }} />
        <Typography variant="h5">{profile.name}</Typography>
        <Typography color="text.secondary">{profile.email}</Typography>
        <Button variant="outlined" onClick={handleEditOpen}>Edit Profile</Button>
      </Stack>
      <Dialog open={open} onClose={handleEditClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" name="name" value={edit.name} onChange={handleChange} fullWidth />
            <TextField label="Email" name="email" value={edit.email} onChange={handleChange} fullWidth />
            <TextField label="Avatar URL" name="avatar" value={edit.avatar} onChange={handleChange} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile; 