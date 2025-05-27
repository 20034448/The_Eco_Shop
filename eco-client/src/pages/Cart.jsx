import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';
import { Add, Remove, Delete, DeleteForever, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
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

  const handleRemoveAll = () => {
    updateCart([]);
  };

  const handleBackToShop = () => {
    navigate('/products'); // Adjust to your actual products route
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <>
      <Navbar /> 
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Shopping Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography align="center" variant="h6" sx={{ mt: 4, color: 'text.secondary' }}>
            Your cart is currently empty. Explore products to add some!
          </Typography>
        ) : (
          <>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mb: 3,
                px: 1,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={handleBackToShop}
                sx={{
                  fontWeight: 600,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#e0f2f1',
                    borderColor: '#26a69a',
                    color: '#00796b'
                  }
                }}
                aria-label="Back to shop"
              >
                Back to Shop
              </Button>

              <Tooltip title="Remove all items from cart" arrow>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteForever />}
                  onClick={handleRemoveAll}
                  size="medium"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#ffebee',
                      borderColor: '#f44336',
                      color: '#b71c1c'
                    }
                  }}
                  aria-label="Remove all items"
                >
                  Remove All
                </Button>
              </Tooltip>
            </Box>

            {cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  gap: 2,
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {item.title || item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontStyle: 'italic' }}>
                    {item.description || 'No description available'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                    Price: €{item.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Subtotal: €{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Tooltip title="Decrease quantity" arrow>
                      <IconButton
                        onClick={() => handleQuantityChange(item.id, -1)}
                        size="medium"
                        color="primary"
                        aria-label="decrease quantity"
                      >
                        <Remove />
                      </IconButton>
                    </Tooltip>
                    <Typography
                      sx={{
                        mx: 1,
                        minWidth: 30,
                        textAlign: 'center',
                        fontSize: '1.1rem',
                        fontWeight: 600
                      }}
                    >
                      {item.quantity}
                    </Typography>
                    <Tooltip title="Increase quantity" arrow>
                      <IconButton
                        onClick={() => handleQuantityChange(item.id, 1)}
                        size="medium"
                        color="primary"
                        aria-label="increase quantity"
                      >
                        <Add />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Tooltip title="Remove this item" arrow>
                    <IconButton onClick={() => handleDelete(item.id)} color="error" size="medium" aria-label="remove item">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            ))}

            <Divider sx={{ mt: 3, mb: 2 }} />

            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                Total: €{total.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCheckout}
                sx={{
                  textTransform: 'none',
                  fontWeight: '600',
                  px: 5,
                  py: 1.5
                }}
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
