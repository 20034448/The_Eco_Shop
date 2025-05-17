import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Typography, Button, Grid } from "@mui/material";

// Sample product list with prices
const products = [
  {
    id: 1,
    title: "Recycled Ocean Plastic T-Shirt",
    description: "Made from plastic bottles collected from the ocean.",
    image: "/images/01.jpg",
    category: "Men's Clothing",
    price: 25,
  },
  {
    id: 2,
    title: "Organic Cotton Hoodie",
    description: "Soft, breathable hoodie made from 100% organic cotton.",
    image: "/images/02.png",
    category: "Men's Clothing",
    price: 40,
  },
  {
    id: 3,
    title: "Bamboo Fiber Shorts",
    description: "Eco-friendly and antibacterial material.",
    image: "/images/03.png",
    category: "Men's Clothing",
    price: 30,
  },
  {
    id: 4,
    title: "Mushroom Leather Jacket",
    description: "Innovative jacket made from mushroom roots.",
    image: "/images/04.png",
    category: "Men's Clothing",
    price: 70,
  },
];

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));
  const [mainImage, setMainImage] = useState(product?.image || "");

  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  };

  const handleBuyNow = () => {
    localStorage.setItem("cart", JSON.stringify([{ ...product, quantity: 1 }]));
    navigate("/payment");
  };

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
            <Typography variant="h6" color="primary">
              Price: ${product.price}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button variant="contained" color="success" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="outlined" color="primary" onClick={handleBuyNow}>
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
