import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box, Grid, Alert, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const API_base_url = import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api";
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!form.email || !form.password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      console.log('Sending login to:', `${API_base_url}/login`);
      console.log('Data sent:', form);

      const response = await fetch(`${API_base_url}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        }),
      });

      console.log('Response status:', response.status);

      let data = null;

      try {
        const text = await response.text();
        if (text) {
          data = JSON.parse(text);
        } else {
          console.warn('Empty response from server');
        }
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }

      console.log('Data received:', data);
      console.log('Server response:', data);

      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home');
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Error connecting to the server.');
      console.error(err);
    }
  };

  return (
    <>
    <Navbar />
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 10, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login to Your Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2} align="center" justifyContent="center">
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
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
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
          </Grid>

          <Grid item xs={8}>
          <Button
            type="submit"
            fullWidth={false}
            variant="contained"
            sx={{ width: '85%', mt: 4, backgroundColor: '#1976d2', fontWeight: 'bold' }}
          >
            Login
          </Button>
          </Grid>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don't have an account?{' '}
            <MuiLink component={Link} to="/register" underline="hover" sx={{ cursor: 'pointer' }}>
              Click here to register
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
    <Footer />  
    </>
  );
};

export default Login;
