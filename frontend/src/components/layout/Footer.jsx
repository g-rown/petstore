import React from 'react';
import { Typography, Container, Box, Grid, Link, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#f5f3f0', 
        color: '#131d19', 
        py: 6, 
        mt: 'auto',
        borderTop: '1px solid #ddd0c4'
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PetsIcon sx={{ mr: 1, color: '#639279', fontSize: 32 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#639279' }}>
                PetStore
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#77a58d', mb: 2, lineHeight: 1.6 }}>
              Your trusted partner for finding the perfect companion. We connect loving homes with adorable pets from verified breeders and shelters.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" sx={{ color: '#639279', '&:hover': { bgcolor: 'rgba(99, 146, 121, 0.1)' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: '#639279', '&:hover': { bgcolor: 'rgba(99, 146, 121, 0.1)' } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: '#639279', '&:hover': { bgcolor: 'rgba(99, 146, 121, 0.1)' } }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#131d19', mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/" sx={{ color: '#77a58d', textDecoration: 'none', '&:hover': { color: '#639279' } }}>
                Home
              </Link>
              <Link component={RouterLink} to="/catalog" sx={{ color: '#77a58d', textDecoration: 'none', '&:hover': { color: '#639279' } }}>
                Browse Pets
              </Link>
              <Link component={RouterLink} to="/orders" sx={{ color: '#77a58d', textDecoration: 'none', '&:hover': { color: '#639279' } }}>
                My Orders
              </Link>
              <Link component={RouterLink} to="/admin" sx={{ color: '#77a58d', textDecoration: 'none', '&:hover': { color: '#639279' } }}>
                Admin Panel
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#131d19', mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: '#639279', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#77a58d' }}>
                  support@petstore.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ color: '#639279', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#77a58d' }}>
                  +1 (555) 123-PETS
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon sx={{ color: '#639279', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#77a58d' }}>
                  123 Pet Avenue, Animal City, AC 12345
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box sx={{ borderTop: '1px solid #ddd0c4', mt: 4, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#77a58d' }}>
            &copy; {new Date().getFullYear()} PetStore MVP. All rights reserved. | Made with ❤️ for pets and their families.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
