import React, { useEffect, useState } from "react";
import {Box,Typography, TextField,Button,Grid,List,ListItem,ListItemText,IconButton,Paper} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const API_base_url = import.meta.env.VITE_APP_API_URL || "http://localhost:3000";

export default function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token || "";
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_base_url}/Products`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleAddProduct = async () => {
    if (!title || !description || !category || !price) return;

    try {
      await fetch(`${API_base_url}/Products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          category,
          price: Number(price)
        })
      });
      setTitle("");
      setDescription("");
      setImageUrl("");
      setCategory("");
      setPrice("");
      fetchProducts();
    } catch (err) {
      console.error("Failed to add product", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_base_url}/Products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box sx={{ p: 4, maxWidth: "1000px", mx: "auto" }}>
      <Typography variant="h5" color="#357960" gutterBottom>
        Admin: Manage Products
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Product Name" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth label="Price (€)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddProduct}
            sx={{ backgroundColor: "#357960", color: "white" }}
          >
            Add
          </Button>
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
              sx={{ borderBottom: "1px solid #eee" }}
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
