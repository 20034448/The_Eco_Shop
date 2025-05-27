import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Typography, Button, Grid, Modal, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const products = [
  { id: 1, title: "Recycled Ocean Plastic T-Shirt", description: "Made from plastic bottles collected from the ocean.", image: "/images/01.jpg", category: "Men's Clothing", price: 29.99 },
  { id: 2, title: "Organic Cotton Hoodie", description: "Soft, breathable hoodie made from 100% organic cotton.", image: "/images/02.png", category: "Men's Clothing", price: 49.99 },
  { id: 3, title: "Bamboo Fiber Shorts", description: "Eco-friendly and antibacterial material.", image: "/images/03.png", category: "Men's Clothing", price: 34.99 },
  { id: 4, title: "Mushroom Leather Jacket", description: "Innovative jacket made from mushroom roots.", image: "/images/04.png", category: "Men's Clothing", price: 120.00 },
  { id: 5, title: "Hemp Denim Jeans", description: "Durable jeans made from sustainable hemp.", image: "/images/05.png", category: "Men's Clothing", price: 59.99 },
  { id: 6, title: "Upcycled Silk Blouse", description: "Created from discarded silk fabrics.", image: "/images/06.jpeg", category: "Women's Clothing", price: 45.00 },
  { id: 7, title: "Eco Wool Coat", description: "Sustainably sourced wool for a warm, ethical winter.", image: "/images/07.png", category: "Women's Clothing", price: 150.00 },
  { id: 8, title: "Cactus Leather Handbag", description: "Stylish and cruelty-free alternative to leather.", image: "/images/08.png", category: "Women's Clothing", price: 80.00 },
  { id: 9, title: "Linen Dress", description: "Made with flax plants requiring minimal water.", image: "/images/09.jpg", category: "Women's Clothing", price: 55.00 },
  { id: 10, title: "Tencel Lounge Pants", description: "Soft, sustainable, and biodegradable material.", image: "/images/010.png", category: "Women's Clothing", price: 38.00 },
  { id: 11, title: "Organic Vegan Protein Powder", description: "Plant-based protein from sustainable farming.", image: "/images/011.png", category: "Food", price: 25.00 },
  { id: 12, title: "Compostable Tea Bags", description: "Zero-waste herbal tea packed in compostable materials.", image: "/images/012.png", category: "Food", price: 12.50 },
  { id: 13, title: "Regenerative Farm Honey", description: "Honey harvested from pollinator-friendly farms.", image: "/images/013.png", category: "Food", price: 18.00 },
  { id: 14, title: "Fair Trade Coffee Beans", description: "Supporting small farmers with ethical practices.", image: "/images/014.png", category: "Food", price: 15.00 },
  { id: 15, title: "Zero-Waste Snack Packs", description: "Nutrient-packed snacks in reusable packaging.", image: "/images/015.png", category: "Food", price: 8.00 },
  { id: 16, title: "Bamboo Toothbrush Set", description: "Biodegradable and compostable alternative.", image: "/images/016.png", category: "Homeware", price: 14.00 },
  { id: 17, title: "Solar Powered Lamp", description: "Bright light powered entirely by the sun.", image: "/images/017.png", category: "Homeware", price: 40.00 },
  { id: 18, title: "Recycled Glass Tumblers", description: "Handcrafted using 100% recycled glass.", image: "/images/018.png", category: "Homeware", price: 22.00 },
  { id: 19, title: "Compost Bin", description: "Sleek design for your eco kitchen waste.", image: "/images/019.png", category: "Homeware", price: 60.00 },
  { id: 20, title: "Organic Cotton Towels", description: "Soft, absorbent, and free of harmful chemicals.", image: "/images/020.png", category: "Homeware", price: 35.00 },
  { id: 21, title: "Eco-Friendly Yoga Mat", description: "Made from natural rubber and non-toxic dyes, this mat offers excellent grip and comfort.", image: "/images/021.png", category: "Homeware", price: 45.00 }
];

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  const [openModal, setOpenModal] = useState(false);

  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  };

  const handleBuyNow = () => {
    const singleItemCart = [{
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      quantity: 1
    }];
    localStorage.setItem("cart", JSON.stringify(singleItemCart));
    navigate("/payment");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: { xs: 2, md: 6 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            {/* Imagem principal clicável para abrir modal */}
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                width: '100%',
                maxHeight: 400,
                objectFit: 'contain',
                borderRadius: 3,
                boxShadow: 3,
                mb: 2,
                userSelect: 'none',
                cursor: 'zoom-in',
              }}
              loading="lazy"
              onClick={() => setOpenModal(true)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontStyle: 'italic' }}>
              {product.category}
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
              {product.description}
            </Typography>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 700, mb: 3 }}>
              Price: €{product.price.toFixed(2)}
            </Typography>

            <Box sx={{ display: "flex", gap: 3, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={handleAddToCart}
                sx={{ textTransform: 'none', fontWeight: 600, px: 4 }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={handleBuyNow}
                sx={{ textTransform: 'none', fontWeight: 600, px: 4 }}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Modal para zoom da imagem */}
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="zoomed-image-modal"
          aria-describedby="larger-view-of-product-image"
          closeAfterTransition
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0,0,0,0.8)',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              outline: 'none',
              maxWidth: '90vw',
              maxHeight: '90vh',
            }}
          >
            <IconButton
              onClick={() => setOpenModal(false)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.4)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }
              }}
              aria-label="Close image zoom"
            >
              <CloseIcon />
            </IconButton>

            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                userSelect: 'none',
              }}
            />
          </Box>
        </Modal>
      </Box>
      <Footer />
    </>
  );
};

export default ItemDetails;
