import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = 'Full name is required.';
      isValid = false;
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    } else if (!/^\+?\d{7,15}$/.test(form.phone)) {
      newErrors.phone = 'Invalid phone format.';
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }

    if (!form.address.trim()) {
      newErrors.address = 'Address is required.';
      isValid = false;
    }

    if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      const userProfile = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        password: form.password,
      };

      try {
        const response = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userProfile),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao criar conta');
        }

        alert('Account created successfully!');
        navigate('/login');

      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 10, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="name"
                fullWidth
                value={form.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phone"
                fullWidth
                value={form.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                value={form.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                value={form.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              backgroundColor: '#1976d2',
              fontWeight: 'bold'
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Register'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
