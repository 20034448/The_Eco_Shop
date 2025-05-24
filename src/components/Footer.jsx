import React from 'react';
import { Box, Typography, Link as MuiLink} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
    <Box
      component="footer"
      sx={{
        backgroundColor: '#357960',
        color: 'white',
        py: 3,
        mt: 5,
        
      }}
    >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            px: 2           
          }}
        >
          <Typography variant="body2" align="center" color='white'>
            © {new Date().getFullYear()} EcoShop. All rights reserved.
          </Typography>


          <Box sx={{ display: 'flex', gap: 2 }}>
          <MuiLink component={RouterLink} to="/about" color="inherit" underline="hover">
            <Typography variant="body2" align="center" color="white">About Us</Typography>
          </MuiLink>
          <MuiLink component={RouterLink} to="/contact" color="inherit" underline="hover">
            <Typography variant="body2" align="center" color="white">Contact</Typography>
          </MuiLink>
          <MuiLink component={RouterLink} to="/privacy" color="inherit" underline="hover">
            <Typography variant="body2" align="center" color="white">Privacy Policy</Typography>
          </MuiLink>
          </Box>
        </Box>
    </Box>
      </Box>
  );
};

export default Footer;
