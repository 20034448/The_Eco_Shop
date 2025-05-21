import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Tooltip, InputBase, Box, Drawer, List, ListItem, ListItemText, Button, Menu, MenuItem } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Pega o usuário do localStorage e o nome completo
  const userObj = JSON.parse(localStorage.getItem('user'));
  const fullName = userObj?.fullName || '';
  // Pega a primeira letra do primeiro nome, maiúscula
  const firstLetter = fullName ? fullName.trim().charAt(0).toUpperCase() : 'L';

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
    navigate('/Login');
  };

  const handleLogin = () => {
    handleMenuClose();
    navigate('/Login');
  };

  const handleCart = () => {
    handleMenuClose();
    navigate('/Cart');
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/Profile');
  };

  const menuItems = [
    { label: 'Home', link: '/home' },
    { label: 'Products', link: '/products' },
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
              sx={{
                color: 'inherit',
                paddingLeft: '40px',
                width: { xs: '100%', sm: '20ch' },
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>

          {/* Avatar + Menu */}
          <Tooltip title={userObj ? 'Logged in' : 'Login'}>
            <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: 'white', color: '#357960', fontWeight: 'bold' }}>
                {firstLetter}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
          >
            {userObj ? [
                <MenuItem onClick={handleProfile} key="profile">Profile</MenuItem>,
                <MenuItem onClick={handleCart} key="cart">Cart</MenuItem>,
                <MenuItem onClick={handleLogout} key="logout">Logout</MenuItem>
             ] : (
              <MenuItem onClick={handleLogin} key="login">Login</MenuItem>
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
                to={item.link.toLowerCase()}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem button component={RouterLink} to="/cart">
              <ListItemText primary="View Cart" />
            </ListItem>
            {userObj ? (
              <ListItem button component={RouterLink} to="/profile">
                <ListItemText primary="Profile" />
              </ListItem>
            ) : (
              <ListItem button onClick={handleLogin}>
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
