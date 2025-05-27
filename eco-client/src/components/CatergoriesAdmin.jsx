import React, { useEffect, useState } from "react";
import {Box, Typography,TextField,Button,List,ListItem,IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const API_base_url = import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token || "";
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_base_url}/categories`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const addCategory = async () => {
    try {
      await fetch(`${API_base_url}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ name, value })
      });
      setName("");
      setValue("");
      fetchCategories();
    } catch (err) {
      console.error("Failed to add category", err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await fetch(`${API_base_url}/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      fetchCategories();
    } catch (err) {
      console.error("Failed to delete category", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box sx={{ p: 4, maxWidth: "800px", mx: "auto" }}>
      <Typography variant="h5" color="#357960" gutterBottom>
        Admin: Manage Categories
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={addCategory}
          sx={{ backgroundColor: "#357960", color: "white" }}
        >
          Add
        </Button>
      </Box>

      <List>
        {categories.map((cat) => (
          <ListItem
            key={cat.id}
            sx={{
              justifyContent: "space-between",
              borderBottom: "1px solid #ccc"
            }}
            secondaryAction={
              <IconButton edge="end" onClick={() => deleteCategory(cat.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            {cat.name} ({cat.value})
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
