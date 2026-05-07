import React from 'react';
import { Box, Container, Typography, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import StarIcon from '@mui/icons-material/Star';

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #f0f7f3 0%, #fafaf8 50%, #f5f0ea 100%)',
        pt: { xs: 6, md: 12 },
        pb: { xs: 6, md: 20 },
        px: 0,
        mb: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative background blobs */}
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,146,121,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -60,
          left: -60,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(221,208,196,0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'center',
            minHeight: { xs: 'auto', md: '520px' },
          }}
        >
          {/* Left — Text & CTA */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Badge */}
            <Chip
              icon={<PetsIcon sx={{ fontSize: 16, color: '#639279 !important' }} />}
              label="Trusted Pet Store Since 2020"
              sx={{
                mb: 3,
                fontWeight: 600,
                fontSize: '0.8rem',
                color: '#2d6a50',
                bgcolor: 'rgba(45,106,80,0.1)',
                border: '1px solid rgba(45,106,80,0.2)',
                borderRadius: '20px',
                px: 0.5,
                animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                animationDelay: '0s',
                animationFillMode: 'both',
              }}
            />

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontFamily: 'serif',
                fontSize: { xs: '2.4rem', sm: '3rem', md: '3.75rem' },
                fontWeight: 800,
                color: '#08150d',
                lineHeight: 1.15,
                mb: 2.5,
                letterSpacing: '-0.5px',
                animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                animationDelay: '0.1s',
                animationFillMode: 'both',
              }}
            >
              Your Perfect{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #2d6a50 0%, #4a9e74 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Pet Awaits
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#4a7060',
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 400,
                lineHeight: 1.7,
                mb: 4,
                maxWidth: '85%',
                animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                animationDelay: '0.2s',
                animationFillMode: 'both',
              }}
            >
              Discover adorable, loving pets ready to join your family. From playful puppies to gentle kittens — find your forever friend today.
            </Typography>

            {/* CTA Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5 }}>
              <Button
                component={Link}
                to="/catalog"
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #2d6a50 0%, #3d8a68 100%)',
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '10px',
                  textTransform: 'none',
                  boxShadow: '0 6px 20px rgba(45,106,80,0.35)',
                  transition: 'all 0.3s ease',
                  animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                  animationDelay: '0.3s',
                  animationFillMode: 'both',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1f5239 0%, #2d6a50 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 28px rgba(45,106,80,0.4)',
                  },
                }}
              >
                Shop Now
              </Button>
              <Button
                component={Link}
                to="/catalog"
                variant="outlined"
                sx={{
                  color: '#2d6a50',
                  borderColor: '#2d6a50',
                  borderWidth: 2,
                  px: 3.5,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: '10px',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                  animationDelay: '0.4s',
                  animationFillMode: 'both',
                  '&:hover': {
                    borderWidth: 2,
                    bgcolor: 'rgba(45,106,80,0.06)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Browse Catalog
              </Button>
            </Box>

            {/* Social proof */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
              animationDelay: '0.5s',
              animationFillMode: 'both',
            }}>
              {/* Avatar stack */}
              <Box sx={{ display: 'flex' }}>
                {['🐶', '🐱', '🐦'].map((emoji, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      bgcolor: '#e8f5ef',
                      border: '2.5px solid #fff',
                      ml: i === 0 ? 0 : -1.2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                    }}
                  >
                    {emoji}
                  </Box>
                ))}
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} sx={{ fontSize: 14, color: '#f5a623' }} />
                  ))}
                </Box>
                <Typography sx={{ fontSize: '0.78rem', color: '#5d8f7f', fontWeight: 500 }}>
                  Loved by 2,000+ happy pet owners
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right — Hero Image */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Floating accent ring */}
            <Box
              sx={{
                position: 'absolute',
                width: '110%',
                height: '110%',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                background: 'linear-gradient(135deg, rgba(45,106,80,0.12) 0%, rgba(221,208,196,0.2) 100%)',
                zIndex: 0,
                animation: 'morphBlob 8s ease-in-out infinite',
                '@keyframes morphBlob': {
                  '0%, 100%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
                  '50%': { borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%' },
                },
              }}
            />

            {/* Main image container */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                height: { xs: '320px', md: '460px' },
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(8,21,13,0.18)',
                border: '4px solid rgba(255,255,255,0.8)',
                animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                animationDelay: '0.2s',
                animationFillMode: 'both',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop&auto=format"
                alt="Happy dogs running together"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
              {/* Gradient overlay at bottom */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(8,21,13,0.35) 0%, transparent 100%)',
                }}
              />
              {/* Floating badge on image */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: 20,
                  bgcolor: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  px: 2,
                  py: 1.2,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                  animationDelay: '0.4s',
                  animationFillMode: 'both',
                }}
              >
                <Box sx={{ fontSize: '1.4rem' }}>🐾</Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#08150d', lineHeight: 1.2 }}>
                    100+ Breeds
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: '#5d8f7f', fontWeight: 500 }}>
                    Available now
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Floating stat card top-right */}
            <Box
              sx={{
                position: 'absolute',
                top: { xs: -10, md: 10 },
                right: { xs: -8, md: -20 },
                bgcolor: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '14px',
                px: 2.5,
                py: 1.5,
                boxShadow: '0 8px 24px rgba(45,106,80,0.15)',
                border: '1px solid rgba(255,255,255,0.9)',
                zIndex: 2,
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                gap: 1.5,
                animation: 'fadeInUp 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                animationDelay: '0.3s',
                animationFillMode: 'both',
              }}
            >
              <Box sx={{ fontSize: '1.8rem' }}>❤️</Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: '#2d6a50', lineHeight: 1 }}>
                  2,000+
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#5d8f7f', fontWeight: 500 }}>
                  Happy owners
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
