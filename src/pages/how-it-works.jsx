import React from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography, Grid, Paper, Stepper, Step, StepLabel, Card, CardContent } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Footer from '../components/Footer';

const steps = [
  {
    label: 'Browse Products',
    description: 'Explore a variety of sustainable products from trusted vendors.',
    icon: <SearchIcon fontSize="large" />,
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
      <Box sx={{ width: '100%', mx: 'auto' }}>
      <Box>
        <Card sx={{ mb: 1.5, mt: 4 }}>
          <CardContent>
            <Typography variant="h5">How It Works</Typography>
            <Typography variant="body2">Becoming more eco-conscious is simple when you choose the right products.</Typography>
          </CardContent>
        </Card> 
     </Box>

    <Box sx={{  p: 4, textAlign: 'center', backgroundColor: '#f7f7f7' }}>
        
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

        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 4,
            mt: 5,
            px: 2,
          }}
          >
          {steps.map((step, index) => (
            <Paper key={index} elevation={3}
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
          ))}
        </Box>
        </Box>
        </Box>
      <Footer/>
    </>
  );
};

export default HowItWorks;
