// Add at the top with other imports
import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Avatar, Tooltip,
  InputBase, Box, Drawer, List, ListItem, ListItemText,
  Button, Menu, MenuItem
} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const username = localStorage.getItem('user') || null;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    handleMenuClose();
    navigate('/');
  };

  const handleLogin = () => {
    handleMenuClose();
    navigate('/login');
  };

  const handleShoppingBag = () => {
    handleMenuClose();
    navigate('/shopping-bag');
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate(`/Products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const menuItems = [
    { label: 'Home', link: '/home' },
    { label: 'Products', link: '/Products' },
    { label: 'How It Works', link: '/how-it-works' },
    { label: 'FAQs', link: '/faqs' },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#357960', color: 'white' }}>
        <Toolbar>

          {/* Mobile Hamburger */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Menu Buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, flexGrow: 1 }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                component={RouterLink}
                to={item.link}
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              onClick={() => navigate('/cart')}
              color="inherit"
              sx={{ textTransform: 'none' }}
            >
              View Cart
            </Button>
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 1,
              backgroundColor: alpha('#ffffff', 0.15),
              '&:hover': {
                backgroundColor: alpha('#ffffff', 0.25),
              },
              marginRight: 2,
              marginLeft: 2,
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            <Box
              sx={{
                padding: '0 16px',
                height: '100%',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              sx={{
                color: 'inherit',
                paddingLeft: '40px',
                width: { xs: '100%', sm: '20ch' },
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>

          {/* Avatar + Menu */}
          <Tooltip title={username ? username : 'Login'}>
            <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: 'white', color: '#357960', fontWeight: 'bold' }}>
                {username ? username.charAt(0).toUpperCase() : 'L'}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
          >
            {username ? [
              <MenuItem onClick={handleShoppingBag}>Shopping Bag</MenuItem>,
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ] : (
              <MenuItem onClick={handleLogin}>Login</MenuItem>
            )}
          </Menu>

        </Toolbar>
      </AppBar>

      {/* Mobile Navbar */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                component={RouterLink}
                to={item.link}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem button component={RouterLink} to="/cart">
              <ListItemText primary="View Cart" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
