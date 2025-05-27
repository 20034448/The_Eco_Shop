import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box, Grid, Alert, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

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

    // Validação simples
    if (!form.email || !form.password) {
      setError('Por favor, preencha email e senha.');
      return;
    }

    try {
      console.log('Enviando login para:', `${import.meta.env.VITE_API_URL}/login`);
      console.log('Dados enviados:', form);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // removido credentials para evitar problemas com cookies
        body: JSON.stringify({
          email: form.email,
          password: form.password
        }),
      });

      console.log('Status da resposta:', response.status);

      const data = await response.json();

      console.log('Resposta do servidor:', data);

      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user)); // chave ajustada para 'user'
        navigate('/home'); // redireciona após login
      } else {
        setError(data.message || 'Email ou senha inválidos.');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor.');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 10, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login to Your Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4, backgroundColor: '#1976d2', fontWeight: 'bold' }}
          >
            Login
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don't have an account?{' '}
            <MuiLink component={Link} to="/register" underline="hover" sx={{ cursor: 'pointer' }}>
              Click here to register
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
