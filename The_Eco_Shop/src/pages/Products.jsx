import React from 'react';
import Navbar from '../components/Navbar';
import { Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

const products = [
  // 🌿 Men's Clothing
  {
    id: 1,
    title: "Recycled Ocean Plastic T-Shirt",
    description: "Made from plastic bottles collected from the ocean.",
    image: "/The_Eco_Shop/src/assets/images/01.jpg/..", // 1
    category: "Men's Clothing"
  },
  {
    id: 2,
    title: "Organic Cotton Hoodie",
    description: "Soft, breathable hoodie made from 100% organic cotton.",
    image: "/The_Eco_Shop/src/assets/images/02.webp", // 2
    category: "Men's Clothing"
  },
  {
    id: 3,
    title: "Bamboo Fiber Shorts",
    description: "Eco-friendly and antibacterial material.",
    image: "/images/product3.jpg", // 3
    category: "Men's Clothing"
  },
  {
    id: 4,
    title: "Mushroom Leather Jacket",
    description: "Innovative jacket made from mushroom roots.",
    image: "/images/product4.jpg", // 4
    category: "Men's Clothing"
  },
  {
    id: 5,
    title: "Hemp Denim Jeans",
    description: "Durable jeans made from sustainable hemp.",
    image: "/images/product5.jpg", // 5
    category: "Men's Clothing"
  },

  // ♻️ Women's Clothing
  {
    id: 6,
    title: "Upcycled Silk Blouse",
    description: "Created from discarded silk fabrics.",
    image: "/images/product6.jpg", // 6
    category: "Women's Clothing"
  },
  {
    id: 7,
    title: "Eco Wool Coat",
    description: "Sustainably sourced wool for a warm, ethical winter.",
    image: "/images/product7.jpg", // 7
    category: "Women's Clothing"
  },
  {
    id: 8,
    title: "Cactus Leather Handbag",
    description: "Stylish and cruelty-free alternative to leather.",
    image: "/images/product8.jpg", // 8
    category: "Women's Clothing"
  },
  {
    id: 9,
    title: "Linen Dress",
    description: "Made with flax plants requiring minimal water.",
    image: "/images/product9.jpg", // 9
    category: "Women's Clothing"
  },
  {
    id: 10,
    title: "Tencel Lounge Pants",
    description: "Soft, sustainable, and biodegradable material.",
    image: "/images/product10.jpg", // 10
    category: "Women's Clothing"
  },

  // 🌱 Food
  {
    id: 11,
    title: "Organic Vegan Protein Powder",
    description: "Plant-based protein from sustainable farming.",
    image: "/images/product11.jpg", // 11
    category: "Food"
  },
  {
    id: 12,
    title: "Compostable Tea Bags",
    description: "Zero-waste herbal tea packed in compostable materials.",
    image: "/images/product12.jpg", // 12
    category: "Food"
  },
  {
    id: 13,
    title: "Regenerative Farm Honey",
    description: "Honey harvested from pollinator-friendly farms.",
    image: "/images/product13.jpg", // 13
    category: "Food"
  },
  {
    id: 14,
    title: "Fair Trade Coffee Beans",
    description: "Supporting small farmers with ethical practices.",
    image: "/images/product14.jpg", // 14
    category: "Food"
  },
  {
    id: 15,
    title: "Zero-Waste Snack Packs",
    description: "Nutrient-packed snacks in reusable packaging.",
    image: "/images/product15.jpg", // 15
    category: "Food"
  },

  // 🚀 Homeware
  {
    id: 16,
    title: "Bamboo Toothbrush Set",
    description: "Biodegradable and compostable alternative.",
    image: "/images/product16.jpg", // 16
    category: "Homeware"
  },
  {
    id: 17,
    title: "Solar Powered Lamp",
    description: "Bright light powered entirely by the sun.",
    image: "/images/product17.jpg", // 17
    category: "Homeware"
  },
  {
    id: 18,
    title: "Recycled Glass Tumblers",
    description: "Handcrafted using 100% recycled glass.",
    image: "/images/product18.jpg", // 18
    category: "Homeware"
  },
  {
    id: 19,
    title: "Compost Bin",
    description: "Sleek design for your eco kitchen waste.",
    image: "/images/product19.jpg", // 19
    category: "Homeware"
  },
  {
    id: 20,
    title: "Organic Cotton Towels",
    description: "Soft, absorbent, and free of harmful chemicals.",
    image: "/images/product20.jpg", // 20
    category: "Homeware"
  },

  // 🚀 New Product
  {
    id: 21,
    title: "Recycled Plastic Water Bottle",
    description: "Made from ocean plastic to reduce waste.",
    image: "/images/product21.jpg", // 21
    category: "Homeware"
  }
];

const Products = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Our Eco-Friendly Products
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="caption" display="block" mt={1}>
                    Category: {product.category}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Products;
