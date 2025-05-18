import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Typography, Button, Grid } from "@mui/material";

// Sample product list with prices
const products = [
  
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
              Price: €{product.price}
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
