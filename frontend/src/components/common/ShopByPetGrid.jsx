import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ShopByPetGrid = ({ categories }) => {
  // Pastel color palette for each card - soft and warm
  const pastelColors = {
    0: '#f5e6d3', // Soft cream
    1: '#e8d5c4', // Soft taupe
    2: '#dae5e0', // Soft sage
    3: '#e8d9d1', // Soft blush
    4: '#dfe5d9', // Soft mint
    5: '#e5dbd4', // Soft sand
  };

  // High-quality transparent PNG images - half body cropped, large
  const petImages = {
    Dogs: 'https://png.pngtree.com/png-vector/20250111/ourmid/pngtree-golden-retriever-dog-pictures-png-image_15147078.png',
    Cats: 'https://www.freeiconspng.com/thumbs/cat-png/cat-png-17.png',
    Birds: 'https://png.pngtree.com/png-clipart/20240316/original/pngtree-half-green-parrot-png-image_14600499.png',
    Rabbits: 'https://png.pngtree.com/png-clipart/20240316/original/pngtree-half-green-parrot-png-image_14600499.png',
    Hamsters: 'https://static.vecteezy.com/system/resources/previews/048/718/642/non_2x/fish-on-transparent-background-free-png.png',
    Fish: 'https://static.vecteezy.com/system/resources/previews/048/718/642/non_2x/fish-on-transparent-background-free-png.png',
  };

  // Limit to 4 categories for the grid
  const displayedCategories = categories.slice(0, 4);

  return (
    <Box sx={{ py: 10, px: 2 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontFamily: 'serif',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            color: '#131d19',
            textAlign: 'center',
            mb: 2,
            animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
            animationFillMode: 'both',
          }}
        >
          Shop by Pet
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            color: '#77a58d',
            fontSize: '1.05rem',
            mb: 8,
            maxWidth: '600px',
            mx: 'auto',
            animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
            animationDelay: '0.1s',
            animationFillMode: 'both',
          }}
        >
          Find the perfect companion for your home
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              lg: 'repeat(4, 1fr)' 
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          {displayedCategories.map((category, index) => (
            <Box
              key={category.id}
              component={Link}
              to={`/catalog?category=${category.name}`}
              sx={{
                textDecoration: 'none',
                display: 'block',
                animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                animationDelay: `${0.2 + index * 0.1}s`,
                animationFillMode: 'both',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 2, md: 3 },
                  backgroundColor: pastelColors[index % 6],
                  borderRadius: '16px',
                  padding: { xs: '12px', md: '16px' },
                  height: { xs: '140px', md: '160px' },
                  transition: 'all 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                  position: 'relative',
                  overflow: 'visible',
                  cursor: 'pointer',
                  border: '2px solid rgba(45, 106, 80, 0.08)',
                  '&:hover': {
                    boxShadow: '0 16px 32px rgba(99, 146, 121, 0.2)',
                    transform: 'translateY(-6px)',
                    borderColor: '#639279',
                  },
                }}
              >
                {/* Pet Image Container - Left side with overflow effect */}
                <Box
                  sx={{
                    flexShrink: 0,
                    position: 'relative',
                    width: { xs: '130px', md: '160px' },
                    height: { xs: '130px', md: '160px' },
                    marginLeft: { xs: '-24px', md: '-32px' },
                    marginY: { xs: '-24px', md: '-32px' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'visible',
                    zIndex: 2,
                    filter: 'drop-shadow(0 4px 12px rgba(99, 146, 121, 0.15))',
                  }}
                >
                  <img
                    src={petImages[category.displayName] || category.imageUrl}
                    alt={category.displayName}
                    style={{
                      width: '120%',
                      height: '120%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      filter: 'brightness(1.05)',
                    }}
                  />
                </Box>

                {/* Content - Category Name & Button */}
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: { xs: 1, md: 1.5 },
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'serif',
                      fontWeight: 700,
                      color: '#131d19',
                      fontSize: { xs: '1rem', md: '1.15rem' },
                      margin: 0,
                    }}
                  >
                    {category.displayName}
                  </Typography>

                  {/* Shop Now Button */}
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    component={Link}
                    to={`/catalog?category=${category.name}`}
                    sx={{
                      backgroundColor: '#ffffff',
                      color: '#639279',
                      fontWeight: 600,
                      fontSize: { xs: '0.75rem', md: '0.85rem' },
                      textTransform: 'none',
                      padding: { xs: '4px 12px', md: '6px 16px' },
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      width: 'fit-content',
                      border: '1px solid rgba(99, 146, 121, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#f5f3f0',
                        borderColor: '#639279',
                        boxShadow: '0 4px 12px rgba(99, 146, 121, 0.15)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Shop Now
                    <ArrowForwardIcon sx={{ fontSize: { xs: '14px', md: '16px' } }} />
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ShopByPetGrid;
