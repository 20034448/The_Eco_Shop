import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import mens_clothing from '../assets/mens_clothing.webp';
import womens_clothing from '../assets/womens_clothing.avif';
import Eco_food from '../assets/Eco_food.webp';
import Eco_homeware from '../assets/Eco_homeware.jpeg';
import Footer from '../components/Footer';
import EcoBannerImage from '../assets/Eco_banner.jpg';

// Categories data array with category filters in URL
const categories = [
  {
    title: "Men's Clothing",
    image: mens_clothing,
    link: '/Products?category=mens',
  },
  {
    title: "Women's Clothing",
    image: womens_clothing,
    link: '/Products?category=womens',
  },
  {
    title: 'Food',
    image: Eco_food,
    link: '/Products?category=food',
  },
  {
    title: 'Homeware',
    image: Eco_homeware,
    link: '/Products?category=homeware',
  },
];

const CategoryBanner = () => {
  const [, setOpen] = useState(false);

  return (
    <>
      {/* Navigation bar */}
      <Navbar onMenuClick={() => setOpen(true)} />

      {/* Welcome banner */}
      <Box>
        <Card sx={{ mb: 1.5, mt: 4 }}>
          <CardContent>
            <Typography variant="h5">Welcome to Eco Shop</Typography>
            <Typography variant="body1">Free deliveries over €100</Typography>
            <Typography variant="body2">
              Becoming more eco-conscious is simple when you choose the right products.
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <video width="100%" height="auto" controls autoPlay muted>
            <source src="/ECO.Shop01.mp4" type="video/mp4" />
          </video>
        </Box>
      </Box>

      {/* Categories grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 5,
          mt: 0.5,
        }}
      >
        {categories.map((cat, idx) => (
          <Link
            to={cat.link}
            key={idx}
            style={{ textDecoration: 'none', width: '100%' }}
          >
            <Card
              sx={{
                height: 200,
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
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
            </Card>
          </Link>
        ))}
      </Box>

      {/* Banner image */}
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

      {/* Informational content */}
      <Box sx={{ textAlign: 'left' }}>
        <Card>
          <CardContent>
            <Typography variant="body1">Discover the Future of Eco Living</Typography>
            <Typography variant="body2">
              At EcoShop, we're passionate about showcasing the latest and most exciting eco-initiatives
              shaping a greener tomorrow. Across the globe, innovators are transforming waste into
              resources — like turning ocean plastics into durable clothing, or using mushroom roots
              to create compostable packaging...
            </Typography>
            <br />
            <Typography variant="body1">Join the Movement for a Better Planet</Typography>
            <Typography variant="body2">
              Every product we offer supports a wider movement toward sustainability. From regenerative
              farming practices to zero-waste homeware, the eco revolution is happening now — and it's
              inspiring...
            </Typography>
            <br />
            <Typography variant="body1">Small Changes, Big Impact</Typography>
            <Typography variant="body2">
              Eco innovation is happening all around us — from biodegradable sneakers to solar-powered
              gadgets. Every time you choose eco-conscious products, you become part of a global wave
              of positive change...
            </Typography>
            <br />
            <Typography variant="body1">The Eco Revolution is Here</Typography>
            <Typography variant="body2">
              We believe sustainability should feel exciting, not overwhelming. That’s why we partner
              with brands leading the way in clean technology, ethical fashion, and waste-free living...
            </Typography>
            <br />
          </CardContent>
        </Card>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default CategoryBanner;
