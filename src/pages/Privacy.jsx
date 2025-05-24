import React from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography, Card, CardContent } from '@mui/material';
import Footer from '../components/Footer';
import EcoBannerImage from '../assets/Eco_banner.jpg';

const Privacy = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ width: '100%', mx: 'auto', p:2 }}>
      <Box>
        <Card sx={{ mb: 1.5, mt: 4 }}>
          <CardContent>
            <Typography variant="h5">About The Eco Shop</Typography>
            <Typography variant="body2">Becoming more eco-conscious is simple when you choose the right products.</Typography>
          </CardContent>
        </Card> 
     </Box>
    <Box sx={{ width: '100%', my: 2 }}>
        <img
            src={EcoBannerImage}
            alt="Eco Friendly Living"
            style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: 8,
          }}
        />
      </Box>
    <Box sx={{ textAlign: 'left' }}>
        <Card>
            <CardContent>
                <Typography variant="h5">Privacy Policy</Typography>
                <Typography variant="body1">
                At The Eco Shop, your privacy is our priority. We are committed to protecting the personal information you share with us while ensuring a safe and secure shopping experience. We collect only the data necessary to process your orders, provide customer support, and improve our services. This includes your name, contact details, payment information, and shipping address.
                </Typography><br/>
                <Typography variant="body1">
                We never sell or share your information with third parties for marketing purposes without your explicit consent. Your data is stored securely using industry-standard encryption, and we regularly review our security measures to safeguard against unauthorized access.
                When you visit our website, we may collect non-identifiable information such as browser type and pages visited to help improve site functionality and user experience. Cookies are used to enhance your browsing but can be managed or disabled through your browser settings.
                You have the right to access, update, or delete your personal information at any time by contacting our support team.
                </Typography><br/>
                <Typography variant="body1">
                By shopping with The Eco Shop, you agree to our privacy practices outlined here. We are dedicated to transparency and protecting your data as part of our mission to build a greener, trustworthy community.
                Thank you for trusting The Eco Shop with your eco-friendly lifestyle choices.
                </Typography>
            </CardContent>
        </Card>
    </Box>

    </Box>
      <Footer/>
    </>
  );
};
export default Privacy;