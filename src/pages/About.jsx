import React from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography, Card, CardContent } from '@mui/material';
import Footer from '../components/Footer';
import EcoBannerImage from '../assets/Eco_banner.jpg';

const About = () => {
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
                <Typography variant="h5">Who we are.</Typography>
                <Typography variant="body1">
                At The Eco Shop, we believe that sustainable living should be simple, accessible, and inspiring. 
                Founded on the vision of a greener future, our mission is to make eco-friendly products part of everyday life, helping individuals and families reduce their environmental footprint without compromising on quality or convenience. 
                From reusable household essentials to innovative zero-waste solutions, we carefully curate a selection of products that promote conscious consumption and support the circular economy. 
                We partner with trusted brands that share our commitment to sustainability, ensuring that every item in our store is ethically sourced, responsibly produced and designed to last. 
                At The Eco Shop, we’re more than just a store — we’re a community. 
                We aim to empower our customers with knowledge, resources, and inspiration to live more sustainably. 
                Together, we can make small changes that lead to big impacts for our planet. 
                </Typography>
                <Typography variant="body1">
                Thank you for choosing The Eco Shop. By shopping with us, you’re taking a meaningful step toward a cleaner, greener future. 
                Let’s create a world where eco-friendly choices are the norm, and where every purchase helps protect the Earth for generations to come.

                </Typography>
            </CardContent>
        </Card>
    </Box>

    </Box>
      <Footer/>
    </>
  );
};
export default About;