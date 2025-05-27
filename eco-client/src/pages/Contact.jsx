import React from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography, Card, CardContent } from '@mui/material';
import Footer from '../components/Footer';
import EcoBannerImage from '../assets/Eco_banner.jpg';

const Contact = () => {
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
                <Typography variant="h5">How to get in touch.</Typography>
                <Typography variant="body1">
                    Have questions, feedback, or need assistance? We’re here to help! Reach out to us anytime using the details below.<br /><br />

                    <strong>Email:</strong><br />
                    📧 support@theecoshop.com<br /><br />

                    <strong>Phone:</strong><br />
                    📞 +353 1 234 5678<br /><br />

                    <strong>Address:</strong><br />
                    The Eco Shop<br />
                    123 Greenway Lane<br />
                    Dublin<br />
                    D02 WC04<br /><br />

                    <strong>Business Hours:</strong><br />
                    🕒 Monday – Friday: 9:00 AM – 5:00 PM<br />
                    📦 Closed on weekends and public holidays<br /><br />

                    <strong>Instagram:</strong> @theecoshopuk<br /><br />

                    For inquiries related to your order, shipping, or returns, please include your order number in your message for a quicker response. We aim to reply to all inquiries within 24-48 hours.<br /><br />

                    Thank you for supporting The Eco Shop — let’s build a greener world together!
                </Typography>
            </CardContent>
        </Card>
    </Box>

    </Box>
      <Footer/>
    </>
  );
};
export default Contact;