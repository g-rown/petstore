import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, Badge, 
  Menu, MenuItem, Box, Drawer, List, ListItem, ListItemText, Divider 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onLogout = () => {
    handleMenuClose();
    logout();
    navigate('/');
  };

  const navLinks = [
    // Removed Home and Catalog as per requirements
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main', fontWeight: 'bold' }}>
        <PetsIcon sx={{ mr: 1 }} /> PetStore
      </Typography>
      <Divider />
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.title} disablePadding>
            <Button component={Link} to={item.path} sx={{ width: '100%', py: 1.5, color: 'text.primary' }}>
              {item.title}
            </Button>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        {isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <Button component={Link} to="/orders" sx={{ width: '100%', py: 1.5, color: 'text.primary' }}>
                My Orders
              </Button>
            </ListItem>
            {user?.role === 'ADMIN' && (
              <ListItem disablePadding>
                <Button component={Link} to="/admin" sx={{ width: '100%', py: 1.5, color: 'text.primary' }}>
                  Admin Panel
                </Button>
              </ListItem>
            )}
            <ListItem disablePadding>
              <Button onClick={onLogout} sx={{ width: '100%', py: 1.5, color: 'error.main' }}>
                Logout ({user?.firstName})
              </Button>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <Button component={Link} to="/login" sx={{ width: '100%', py: 1.5, color: 'text.primary' }}>
                Login
              </Button>
            </ListItem>
            <ListItem disablePadding>
              <Button component={Link} to="/register" sx={{ width: '100%', py: 1.5, color: 'primary.main', fontWeight: 'bold' }}>
                Sign Up
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      elevation={isScrolled ? 2 : 0}
      sx={{
        background: isScrolled 
          ? 'rgba(245, 243, 240, 0.8)' 
          : 'rgba(255, 255, 255, 0)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        border: isScrolled ? '1px solid rgba(45, 106, 80, 0.08)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        borderBottom: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 'lg', mx: 'auto', px: { xs: 2, sm: 3 }, width: '100%', py: { xs: 1.5, md: 3 } }}>
        {/* Mobile Menu Icon */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' }, color: '#131d19' }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography
          variant="h4"
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 800,
            color: '#639279',
            textDecoration: 'none',
            fontSize: { xs: '1.2rem', md: '1.75rem' },
            flexGrow: { xs: 1, sm: 0 },
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <PetsIcon sx={{ mr: 1, fontSize: 34 }} />
          PetStore
        </Typography>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1, ml: 4, gap: 2 }}>
          {navLinks.map((item) => (
            <Button 
              key={item.title} 
              component={Link} 
              to={item.path}
              className="nav-link"
              sx={{ 
                color: '#131d19', 
                fontWeight: 500,
                position: 'relative',
                px: 1.5,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: 0,
                  height: '2px',
                  backgroundColor: '#639279',
                  transition: 'all 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                  transform: 'translateX(-50%)',
                },
                '&:hover::after': {
                  width: '80%',
                }
              }}
            >
              {item.title}
            </Button>
          ))}
        </Box>

        {/* Right side actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isAuthenticated && (
            <IconButton component={Link} to="/cart" sx={{ mr: 1, color: '#639279' }}>
              <Badge badgeContent={itemCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
            {isAuthenticated ? (
              <>
                <Button 
                  onClick={handleMenuOpen} 
                  sx={{ 
                    textTransform: 'none', 
                    fontWeight: 500,
                    color: '#131d19',
                  }}
                  startIcon={<AccountCircleIcon />}
                >
                  Hi, {user?.firstName}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem component={Link} to="/orders" onClick={handleMenuClose}>My Orders</MenuItem>
                  {user?.role === 'ADMIN' && (
                    <MenuItem component={Link} to="/admin" onClick={handleMenuClose}>Admin Panel</MenuItem>
                  )}
                  <Divider />
                  <MenuItem onClick={onLogout} sx={{ color: 'error.main' }}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" sx={{ fontWeight: 700, fontSize: '1rem', color: '#5E8A73' }}>
                  Log In
                </Button>
                <Button component={Link} to="/register" variant="contained" sx={{ 
                  borderRadius: 2,
                  px: 4,
                  py: 1.2, 
                  fontSize: '1rem',
                  background: 'linear-gradient(135deg, #639279 0%, #4f7561 100%)',
                  color: '#fff',
                }}>
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
