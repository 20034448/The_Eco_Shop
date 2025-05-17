import React from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography, Grid, Paper, Stepper, Step, StepLabel } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const steps = [
  {
    label: 'Browse Products',
    description: 'Explore a variety of sustainable products from trusted vendors.',
    icon: <ShoppingCartIcon fontSize="large" />,
  },
  {
    label: 'Add to Cart',
    description: 'Select your favorite items and add them to your cart.',
    icon: <ShoppingCartIcon fontSize="large" />,
  },
  {
    label: 'Checkout Securely',
    description: 'Proceed to checkout and enjoy secure and eco-friendly shopping.',
    icon: <PaymentIcon fontSize="large" />,
  },
  {
    label: 'Enjoy Eco-Friendly Shopping!',
    description: 'Receive your order and enjoy your sustainable lifestyle!',
    icon: <LocalShippingIcon fontSize="large" />,
  },
];

const HowItWorks = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ p: 4, textAlign: 'center', backgroundColor: '#f7f7f7' }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          How It Works
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Welcome to The Eco Shop! Here's how our platform works:
        </Typography>

        <Stepper activeStep={-1} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                sx={{
                  fontWeight: 'bold',
                  color: '#76c7c0',
                  '& .MuiStepLabel-label.Mui-completed': {
                    color: '#76c7c0',
                  },
                  '& .MuiStepLabel-label.Mui-active': {
                    color: '#76c7c0',
                  },
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={4} sx={{ mt: 5, justifyContent: 'center' }}>
          {steps.map((step, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  textAlign: 'center',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                }}
              >
                {step.icon}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  {step.label}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default HowItWorks;
