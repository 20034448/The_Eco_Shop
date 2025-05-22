import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, Divider } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ReceiptPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedAddress = localStorage.getItem("deliveryAddress") || "N/A";
    setCart(storedCart);
    setAddress(storedAddress);

    if (storedCart.length > 0) {
      setShippingCost(5); // fixed shipping for now
    }

    // Clear cart after displaying receipt
    localStorage.removeItem("cart");
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + shippingCost;

  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Thank You for Your Purchase!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Your order has been confirmed and will be shipped soon.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>

        <Grid container spacing={2}>
          {cart.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Box display="flex" alignItems="center" gap={2}>
                <img src={item.image} alt={item.title} width={80} height={80} style={{ borderRadius: 8 }} />
                <Box>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                  <Typography variant="body2">Price: €{item.price.toFixed(2)}</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="body1" mt={3}>
          Delivery Address:
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, whiteSpace: "pre-wrap" }}>
          {address}
        </Typography>

        <Typography variant="body1">Subtotal: €{(total - shippingCost).toFixed(2)}</Typography>
        <Typography variant="body1">Shipping: €{shippingCost.toFixed(2)}</Typography>
        <Typography variant="h6" fontWeight="bold">Total Paid: €{total.toFixed(2)}</Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={() => navigate("/")}
        >
          Return to Home
        </Button>
      </Box>
      <Footer />
    </>
  );
};

export default ReceiptPage;
