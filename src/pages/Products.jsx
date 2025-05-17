import React, { useState, useEffect } from 'react';
import { TextField, Grid, Card, CardContent, Typography, CardMedia, Chip, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const productsData = [
  { id: 1, title: "Recycled Ocean Plastic T-Shirt", description: "Made from plastic bottles collected from the ocean.", image: "/images/01.jpg", category: "Men's Clothing" },
  { id: 2, title: "Organic Cotton Hoodie", description: "Soft, breathable hoodie made from 100% organic cotton.", image: "/images/02.png", category: "Men's Clothing" },
  { id: 3, title: "Bamboo Fiber Shorts", description: "Eco-friendly and antibacterial material.", image: "/images/03.png", category: "Men's Clothing" },
  { id: 4, title: "Mushroom Leather Jacket", description: "Innovative jacket made from mushroom roots.", image: "/images/04.png", category: "Men's Clothing" },
  { id: 5, title: "Hemp Denim Jeans", description: "Durable jeans made from sustainable hemp.", image: "/images/05.png", category: "Men's Clothing" },
  { id: 6, title: "Upcycled Silk Blouse", description: "Created from discarded silk fabrics.", image: "/images/06.jpeg", category: "Women's Clothing" },
  { id: 7, title: "Eco Wool Coat", description: "Sustainably sourced wool for a warm, ethical winter.", image: "/images/07.png", category: "Women's Clothing" },
  { id: 8, title: "Cactus Leather Handbag", description: "Stylish and cruelty-free alternative to leather.", image: "/images/08.png", category: "Women's Clothing" },
  { id: 9, title: "Linen Dress", description: "Made with flax plants requiring minimal water.", image: "/images/09.jpg", category: "Women's Clothing" },
  { id: 10, title: "Tencel Lounge Pants", description: "Soft, sustainable, and biodegradable material.", image: "/images/010.png", category: "Women's Clothing" },
  { id: 11, title: "Organic Vegan Protein Powder", description: "Plant-based protein from sustainable farming.", image: "/images/011.png", category: "Food" },
  { id: 12, title: "Compostable Tea Bags", description: "Zero-waste herbal tea packed in compostable materials.", image: "/images/012.png", category: "Food" },
  { id: 13, title: "Regenerative Farm Honey", description: "Honey harvested from pollinator-friendly farms.", image: "/images/013.png", category: "Food" },
  { id: 14, title: "Fair Trade Coffee Beans", description: "Supporting small farmers with ethical practices.", image: "/images/014.png", category: "Food" },
  { id: 15, title: "Zero-Waste Snack Packs", description: "Nutrient-packed snacks in reusable packaging.", image: "/images/015.png", category: "Food" },
  { id: 16, title: "Bamboo Toothbrush Set", description: "Biodegradable and compostable alternative.", image: "/images/016.png", category: "Homeware" },
  { id: 17, title: "Solar Powered Lamp", description: "Bright light powered entirely by the sun.", image: "/images/017.png", category: "Homeware" },
  { id: 18, title: "Recycled Glass Tumblers", description: "Handcrafted using 100% recycled glass.", image: "/images/018.png", category: "Homeware" },
  { id: 19, title: "Compost Bin", description: "Sleek design for your eco kitchen waste.", image: "/images/019.png", category: "Homeware" },
  { id: 20, title: "Organic Cotton Towels", description: "Soft, absorbent, and free of harmful chemicals.", image: "/images/020.png", category: "Homeware" },
  { id: 21, title: "Eco-Friendly Yoga Mat", description: "Made from natural rubber and non-toxic dyes, this mat offers excellent grip and comfort.", image: "/images/021.png", category: "Homeware" }
];

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Products = () => {
  const query = useQuery();
  const searchTerm = query.get('search')?.toLowerCase() || '';
  const [search, setSearch] = useState(searchTerm);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const filteredResults = productsData.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredResults);
  }, [search]);

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 4 }}>
        <TextField
          fullWidth
          label="Search Products"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ mb: 4 }}
        />

        <Grid container spacing={3} justifyContent="center">
          {filtered.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    boxShadow: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.05)' },
                    '&:active': { transform: 'scale(0.98)' }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.image}
                    alt={product.title}
                    sx={{ objectFit: 'cover', borderRadius: '4px 4px 0 0' }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{product.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                    <Chip
                      label={product.category}
                      size="small"
                      sx={{ mt: 1, backgroundColor: '#76c7c0', color: 'white', fontWeight: 'bold' }}
                    />
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Products;
