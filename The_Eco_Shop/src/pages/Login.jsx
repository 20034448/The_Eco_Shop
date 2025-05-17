import React, {useState} from "react";
import {Button, Container, Typography, TextField, Box, Card, CardContent} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");

const navigate = useNavigate();

const handleLogin = () => {
  if(username && password) {
    localStorage.setItem("user", username);
    localStorage.setItem("pass", password);
    //encrypt password at later stage
    navigate("/Home");
    }
  else {
    setError("Please enter username and password");
  }
};

  return(
    <>
    <Navbar />
      <Box>
        <Card sx={{ mb: .5 }}>
          <CardContent>
            <Typography variant="h5">Welcome to The Eco Shop </Typography>
            <Typography variant="body1">Free deliveries over €100</Typography>
            <Typography variant="body2">Becoming more eco-conscious is simple when you choose the right products.</Typography>
          </CardContent>
        </Card>
      </Box>
        
      <Container maxWidth="sm" sx={{mt:10, mb:10}}>
         <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField 
              fullWidth 
              label="Username"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField 
              fullWidth
              label="Password" 
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button 
              fullWidth
              variant="contained"
              sx={{mt:2, backgroundColor: "#357960"}} 
              onClick={handleLogin}>
              Login
            </Button>

            {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        </Container>
        <Box sx={{textAlign: 'center'}}>
          <Card sx={{ backgroundColor:'rgb(230, 243, 239)' }}>
            <CardContent>
              <Typography variant="body1">🚀 The Eco Revolution is Here</Typography>
              <Typography variant="body2">We believe sustainability should feel exciting, not overwhelming. That’s why we partner with brands leading the way in clean technology, ethical fashion, and waste-free living. Whether it’s clothes made from organic fibers or homeware built to last decades, each choice you make helps shape a future where innovation and nature work together — beautifully.</Typography><br/>
            </CardContent>
          </Card>
        </Box>
      <Footer />
    </>
    );
};
export default Login;