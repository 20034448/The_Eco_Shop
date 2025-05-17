import React, {useState} from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import {motion} from 'framer-motion';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import mens_clothing from '../assets/mens_clothing.webp';
import womens_clothing from '../assets/womens_clothing.avif';
import Eco_food from '../assets/Eco_food.webp';
import Eco_homeware from '../assets/Eco_homeware.jpeg';
import Footer from '../components/Footer';


import BreadcrumbsNav from '../components/breadcrumbsNav';

const categories = [
  {
    title: 'Men\'s Clothing',
    image: mens_clothing,
    link: '/Products',
  },
  {
    title: 'Women\'s Clothing',
    image: womens_clothing,
    link: '/Products',
  },
  {
    title: 'Food',
    image: Eco_food,
    link: '/Products',
  },
  {
    title: 'Homeware',
    image: Eco_homeware,
    link: '/Products',
  },
];

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const CategoryBanner = () => {
  const [, setOpen] = useState(false);
  
  return (
    <>
      <Navbar onMenuClick={() => setOpen(true)} />
      <Box>
        <Card sx={{ mb: .5 }}>
          <CardContent>
            <Typography variant="h5">Welcome to The Eco Shop </Typography>
            <Typography variant="body1">Free deliveries over €100</Typography>
            <Typography variant="body2">Becoming more eco-conscious is simple when you choose the right products.</Typography>
          </CardContent>
        </Card>
      </Box>

      <MotionBox
        layout
        transition={{ duration: 0.6, type: 'spring' }}
        sx={{
          p: 2,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)', 
            md: 'repeat(4, 1fr)',
          },
          gap: 5,
          mt: 0.5,
          px: 2,
        }}
      >
        {categories.map((cat, idx) => (
          <Link
            to={cat.link}
            key={idx}
            style={{ textDecoration: 'none', width: '100%' }}
          >
            <MotionCard
              layout
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              sx={{
                height: 200,
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                image={cat.image}
                alt={cat.title}
                sx={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(80%)',
                  transition: 'filter 0.3s ease',
                  '&:hover': {
                    filter: 'brightness(60%)',
                  },
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {cat.title}
                </Typography>
              </Box>
            </MotionCard>
          </Link>
        ))}
      </MotionBox>
      
      <Box sx={{ p: 2,  textAlign: 'left'}}>
        <Card sx={{ mb: .5 }}>
          <CardContent>
            <Typography variant="body1">🌿 Discover the Future of Eco Living</Typography>
            <Typography variant="body2">At EcoShop, we're passionate about showcasing the latest and most exciting eco-initiatives shaping a greener tomorrow. Across the globe, innovators are transforming waste into resources — like turning ocean plastics into durable clothing, or using mushroom roots to create compostable packaging. These incredible projects prove that with creativity and care, we can reimagine how products are made and consumed.
            </Typography><br/>

            <Typography variant="body1">♻️ Join the Movement for a Better Planet</Typography>
            <Typography variant="body2">Every product we offer supports a wider movement toward sustainability. From regenerative farming practices that restore soil health to zero-waste homeware crafted from recycled materials, the eco revolution is happening now — and it's inspiring. Together, we can champion companies that respect the planet, empower local communities, and create a future where conscious living is simply second nature.</Typography><br/>

            <Typography variant="body1">🌱 Small Changes, Big Impact</Typography>
            <Typography variant="body2">Eco innovation is happening all around us — from biodegradable sneakers to solar-powered gadgets that fit in your pocket. Companies and creators are finding bold new ways to blend style, performance, and sustainability. Every time you choose eco-conscious products, you become part of a global wave of positive change, helping to protect the planet for future generations.</Typography><br/>
        </CardContent>
        </Card>
      </Box>
      <Box sx={{textAlign: 'center'}}>
        <Card sx={{ backgroundColor:'rgb(230, 243, 239)' }}>
          <CardContent>
              <Typography variant="body1">🚀 The Eco Revolution is Here</Typography>
              <Typography variant="body2">We believe sustainability should feel exciting, not overwhelming. That’s why we partner with brands leading the way in clean technology, ethical fashion, and waste-free living. Whether it’s clothes made from organic fibers or homeware built to last decades, each choice you make helps shape a future where innovation and nature work together — beautifully.</Typography><br/>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </>
  );
};

export default CategoryBanner;
