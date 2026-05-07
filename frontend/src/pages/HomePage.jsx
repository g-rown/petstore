import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import HeroSection from '../components/common/HeroSection';
import TrustBar from '../components/common/TrustBar';
import ShopByPetGrid from '../components/common/ShopByPetGrid';
import PetGrid from '../components/pet/PetGrid';
import { getCategories, getPets } from '../api/petApi';
import LoadingSpinner from '../components/common/LoadingSpinner';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredPets, setFeaturedPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, petsRes] = await Promise.all([
          getCategories(),
          getPets({ page: 0, size: 4, sort: 'createdAt,desc' })
        ]);
        setCategories(catsRes.data);
        setFeaturedPets(petsRes.data.content);
      } catch (error) {
        console.error("Failed to fetch home data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Bar */}
      <TrustBar />

      {/* Shop by Pet Type */}
      <ShopByPetGrid categories={categories} />

      {/* Featured Pets */}
      {featuredPets.length > 0 && (
        <Box sx={{ py: 10, px: 2 }}>
          <Container maxWidth="lg">
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 6,
              animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
              animationFillMode: 'both',
            }}>
              <Typography 
                variant="h2" 
                component="h2" 
                sx={{ 
                  fontFamily: 'serif',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  color: '#131d19'
                }}
              >
                New Arrivals
              </Typography>
              <Button 
                component={Link} 
                to="/catalog" 
                sx={{ 
                  fontWeight: 600,
                  color: '#639279',
                  textTransform: 'none',
                  fontSize: '1rem',
                  px: 3,
                  py: 1,
                  border: '2px solid #639279',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#639279',
                    color: '#ffffff',
                  }
                }}
              >
                View All Pets
              </Button>
            </Box>
            <Box sx={{
              animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
              animationDelay: '0.1s',
              animationFillMode: 'both',
            }}>
              <PetGrid pets={featuredPets} />
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
