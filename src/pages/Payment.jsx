import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Grid, Divider, Paper, List, ListItem
} from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentPage = () => {
  const navigate = useNavigate();

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validateCard = () => {
    const cardRegex = /^[0-9]{13,19}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^[0-9]{3,4}$/;

    if (!cardName || !cardNumber || !expiry || !cvv || !address) {
      setError('Please fill in all fields.');
      return false;
    }

    if (!cardRegex.test(cardNumber)) {
      setError('Invalid card number.');
      return false;
    }

    if (!expiryRegex.test(expiry)) {
      setError('Invalid expiry date. Use MM/YY.');
      return false;
    }

    if (!cvvRegex.test(cvv)) {
      setError('Invalid CVV.');
      return false;
    }

    return true;
  };

  const handlePayment = () => {
    if (!validateCard()) return;

    localStorage.setItem('deliveryAddress', address);
    navigate('/receipt');
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>Payment Information</Typography>

        <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
          <Typography variant="h6" gutterBottom>Cart Summary</Typography>
          <List dense>
            {cart.map((item, index) => (
              <ListItem
                key={index}
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', py: 1 }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name} × {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description || 'Sem descrição'}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ ml: 2, whiteSpace: 'nowrap' }}>
                  ${ (item.price * item.quantity).toFixed(2) }
                </Typography>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
            Total: ${total.toFixed(2)}
          </Typography>
        </Paper>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name on Card"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              inputProps={{ maxLength: 19 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Expiry Date (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              inputProps={{ maxLength: 5 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CVV"
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              inputProps={{ maxLength: 4 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Delivery Address"
              multiline
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
        </Grid>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
        )}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
          <Button variant="outlined" onClick={() => navigate('/cart')}>Back to Cart</Button>
          <Button variant="outlined" onClick={() => navigate('/products')}>Add More Products</Button>
          <Button variant="contained" onClick={handlePayment} color="primary">Pay Now</Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default PaymentPage;
