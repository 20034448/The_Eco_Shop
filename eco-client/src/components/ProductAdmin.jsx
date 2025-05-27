import React, { useEffect, useState } from "react";
import {Box, Typography, TextField, Button, Grid, List, ListItem, ListItemText, IconButton, Paper} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { desc } from "framer-motion/client";

export default function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:8080/api/Products", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!title || !description || !category || !price) return;
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:8080/api/Products", {
      title,
      description,
      imageUrl,
      category,
      price: Number(price),
      
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTitle(""); setDescription(""); setImageUrl("");  setCategory(""); setPrice("");
    fetchProducts();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8080/api/Products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProducts();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Manage Products
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth label="Product Name" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth label="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label="Price (€)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Grid>
        
        
        <Grid item xs={12} sm={1}>
          <Button fullWidth variant="contained" onClick={handleAddProduct}>Add</Button>
        </Grid>
      </Grid>

      <Paper>
        <List>
          {products.map((product) => (
            <ListItem
              key={product.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDelete(product.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${product.title} - €${product.price}`}
                secondary={`${product.category}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}