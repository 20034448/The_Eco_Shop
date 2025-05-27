import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  Alert
} from '@mui/material';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Load profile from localStorage or fallback for testing
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('profile'));
    if (storedUser && storedUser.password) {
      setProfile(storedUser);
      console.log('Loaded profile from localStorage:', storedUser);
    } else {
      // Fallback test profile - remove or comment out after testing
      const testProfile = {
        name: 'Test User',
        email: 'test@example.com',
        password: '123456',
      };
      setProfile(testProfile);
      localStorage.setItem('profile', JSON.stringify(testProfile));
      console.log('No profile found, using test profile:', testProfile);
      setMessage('Using test profile. Current password is "123456".');
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    console.log('Validating passwords...');
    console.log('Stored password:', profile.password);
    console.log('Entered current password:', form.currentPassword);

    if (form.currentPassword !== profile.password) {
      newErrors.currentPassword = 'Incorrect current password.';
      isValid = false;
    }

    if (form.newPassword.length < 6) {
      newErrors.newPassword = 'New password must be at least 6 characters.';
      isValid = false;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const updated = { ...profile, password: form.newPassword };
      localStorage.setItem('profile', JSON.stringify(updated));
      setProfile(updated);
      setForm({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      setMessage('Password updated successfully!');
      console.log('Password updated in localStorage:', updated);
    } else {
      console.log('Validation failed:', errors);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
          <Typography variant="h5" align="center" gutterBottom>
            My Profile
          </Typography>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                value={profile.name}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                value={profile.email}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              name="currentPassword"
              label="Current Password"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              value={form.currentPassword}
              onChange={handleChange}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword}
            />

            <TextField
              name="newPassword"
              label="New Password"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              value={form.newPassword}
              onChange={handleChange}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
            />

            <TextField
              name="confirmNewPassword"
              label="Confirm New Password"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              value={form.confirmNewPassword}
              onChange={handleChange}
              error={!!errors.confirmNewPassword}
              helperText={errors.confirmNewPassword}
            />

            <Button type="submit" variant="contained" fullWidth>
              Update Password
            </Button>

            {message && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {message}
              </Alert>
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Profile;
