import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Make sure this path is correct
import Footer from "../components/Footer";

const Payment = () => {
  const navigate = useNavigate();

  // ✅ Get cart from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!form.cardName.trim()) {
      newErrors.cardName = 'Name on card is required';
      isValid = false;
    }

    if (!/^\d{16}$/.test(form.cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
      isValid = false;
    }

    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
      newErrors.expiry = 'Expiry must be MM/YY';
      isValid = false;
    }

    if (!/^\d{3}$/.test(form.cvv)) {
      newErrors.cvv = 'CVV must be 3 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(`Payment of €${total.toFixed(2)} successful!`);
      localStorage.removeItem('cart'); // Clear cart after payment
      navigate('/');
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ mt: 8, p: 4, borderRadius: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Review & Payment
          </Typography>

          {/* 🛒 Cart Summary */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Cart Summary</Typography>
            <Divider sx={{ my: 1 }} />
            {cartItems.length === 0 ? (
              <Typography>No items in cart.</Typography>
            ) : (
              <>
                {cartItems.map((item, index) => (
                  <Box
                    key={`${item.id}-${index}`}
                    sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
                  >
                    <Typography>{item.title || item.name} × {item.quantity}</Typography>
                    <Typography>€{(item.price * item.quantity).toFixed(2)}</Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <Typography>Total:</Typography>
                  <Typography>€{total.toFixed(2)}</Typography>
                </Box>
              </>
            )}
          </Box>

          {/* 💳 Payment Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="cardName"
                  label="Name on Card"
                  fullWidth
                  value={form.cardName}
                  onChange={handleChange}
                  error={!!errors.cardName}
                  helperText={errors.cardName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="cardNumber"
                  label="Card Number"
                  fullWidth
                  value={form.cardNumber}
                  onChange={handleChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="expiry"
                  label="Expiry (MM/YY)"
                  fullWidth
                  value={form.expiry}
                  onChange={handleChange}
                  error={!!errors.expiry}
                  helperText={errors.expiry}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="cvv"
                  label="CVV"
                  fullWidth
                  value={form.cvv}
                  onChange={handleChange}
                  error={!!errors.cvv}
                  helperText={errors.cvv}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, backgroundColor: '#1976d2', fontWeight: 'bold' }}
            >
              Pay €{total.toFixed(2)}
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer/>
    </>
  );
};

export default Payment;
