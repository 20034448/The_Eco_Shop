import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Box,
  Link as MuiLink,
  Alert
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    //Validation needed
    // Save to localStorage (in real apps, use secure methods)
    localStorage.setItem("user", username);
    localStorage.setItem("pass", password);
    navigate('/home');
    
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 10 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mb: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>

      <Box textAlign="center">
        <Typography variant="body2">
          Don't have an account?{" "}
          <MuiLink component={Link} to="/register">
            Register here
          </MuiLink>
        </Typography>
      </Box>
    </Container>
    <Footer/>
  );
};

export default Login;
