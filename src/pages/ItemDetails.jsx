import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Typography, Button, Grid } from "@mui/material";

// Import the same product data or move this to a shared file
const products = [
  {
    id: 1,
    title: "Recycled Ocean Plastic T-Shirt",
    description: "Made from plastic bottles collected from the ocean.",
    image: "/images/01.jpg",
    category: "Men's Clothing",
  },
  {
    id: 2,
    title: "Organic Cotton Hoodie",
    description: "Soft, breathable hoodie made from 100% organic cotton.",
    image: "/images/02.png",
    category: "Men's Clothing",
  },
  {
    id: 3,
    title: "Organic Cotton Hoodie",
    description: "Soft, breathable hoodie made from 100% organic cotton.",
    image: "/images/02.png",
    category: "Men's Clothing",
  },
  {
    id: 4,
    title: "Organic Cotton Hoodie",
    description: "Soft, breathable hoodie made from 100% organic cotton.",
    image: "/images/02.png",
    category: "Men's Clothing",
  },
];

const ItemDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const [mainImage, setMainImage] = useState(product?.image || "");

  if (!product) return <p>Product not found</p>;

  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={mainImage}
              alt={product.title}
              style={{ width: "100%", borderRadius: 8 }}
            />
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              {[product.image, product.image, product.image].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setMainImage(img)}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {product.category}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button variant="contained" color="success">
                Add to Cart
              </Button>
              <Button variant="outlined" color="primary">
                Buy Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ItemDetails;
