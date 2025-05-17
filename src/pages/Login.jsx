import React, {useState} from "react";
import {Button, Container, Typography, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if(username) {
            localStorage.setItem("user", username);
            localStorage.setItem("pass", password);
            //encrypt password
            navigate("/Home");
        }
    };

    return(
        <Container maxWidth="sm" sx={{mt:10, mb:10}}>
            <Typography variant="h4" gutterBottom></Typography>
            Login
            <TextField 
            fullWidth 
            label="Username"
            onChange={e => setUsername(e.target.value)}
            />
            <TextField 
            fullWidth
            label="Password" 
            type="password"
            onChange={e => setPassword(e.target.value)}
            />
            <Button 
            fullWidth
            variant="contained" 
            sx={{mt:2}} 
            onClick={handleLogin}
            >Login</Button>
        </Container>
    );
};
export default Login;