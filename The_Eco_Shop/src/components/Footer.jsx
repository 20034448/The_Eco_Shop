import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#357960',
        color: 'white',
        py: 3,
        
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#357960',
            gap: 2,
          }}
        >
          <Typography variant="body2" align="center" color='white'>
            © {new Date().getFullYear()} EcoShop. All rights reserved.
          </Typography>


          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/about" color="inherit" underline="hover">
              About Us
            </Link>
            <Link href="/contact" color="inherit" underline="hover">
              Contact
            </Link>
            <Link href="/privacy" color="inherit" underline="hover">
              Privacy Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
