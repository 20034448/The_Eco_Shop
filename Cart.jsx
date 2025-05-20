import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
  Divider
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleQuantityChange = (id, change) => {
    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    updateCart(updatedCart);
  };

  const handleDelete = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <>
      <Navbar /> 
      <Container maxWidth="md">
        <Typography variant="h5" sx={{ mt: 1, mb: 2 }} align="center">
          Your Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography align="center" variant="h5">Your cart is empty.</Typography>
        ) : (
          <>
            {cart.map((item) => (
              <Box key={item.id} sx={{ mb: 3 }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={8}>
                    <Typography variant="h6">{item.title || item.name}</Typography>
                    <Typography color="text.secondary">
                      ${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => handleQuantityChange(item.id, -1)}><Remove /></IconButton>
                    <Typography sx={{ mx: 1, mt: 1 }}>{item.quantity}</Typography>
                    <IconButton onClick={() => handleQuantityChange(item.id, 1)}><Add /></IconButton>
                    <IconButton onClick={() => handleDelete(item.id)}><Delete /></IconButton>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}

            <Box sx={{ textAlign: 'right', mt: 4 }}>
              <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleCheckout}
              >
                Proceed to Payment
              </Button>
            </Box>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
