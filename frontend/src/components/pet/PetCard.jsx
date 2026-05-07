import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { formatPrice, formatAgeMonths } from '../../utils/formatters';

const PetCard = ({ pet }) => {
  return (
    <Card 
      component={Link} 
      to={`/pets/${pet.id}`}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        textDecoration: 'none',
        borderRadius: '12px',
        border: '1px solid #ede8e0',
        transition: 'all 0.3s ease',
        backgroundColor: '#fafaf8',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 16px 32px rgba(99, 146, 121, 0.12)',
          borderColor: '#639279',
        }
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
        <CardMedia
          component="img"
          height="240"
          image={pet.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={pet.name}
          sx={{ 
            height: 240, 
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
        />
        {pet.status !== 'AVAILABLE' && (
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              bgcolor: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(2px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Chip 
              label={pet.status} 
              color={pet.status === 'SOLD' ? 'error' : 'warning'} 
              size="medium" 
              sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}
            />
          </Box>
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', pt: 2.5, px: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              color: '#131d19', 
              mb: 0,
              fontSize: '1.1rem',
              flex: 1,
              pr: 1,
            }}
          >
            {pet.name}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              color: '#639279',
              fontSize: '1.1rem',
              flexShrink: 0,
            }}
          >
            {formatPrice(pet.price)}
          </Typography>
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 0.75,
            color: '#77a58d',
            fontSize: '0.9rem',
          }}
        >
          <Box component="span" sx={{ fontWeight: 600, color: '#639279' }}>Breed:</Box> {pet.breed || 'Mixed'}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 1.5,
            color: '#77a58d',
            fontSize: '0.9rem',
          }}
        >
          <Box component="span" sx={{ fontWeight: 600, color: '#639279' }}>Age:</Box> {formatAgeMonths(pet.ageMonths)}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mt: 'auto',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            color: '#77a58d',
            fontSize: '0.9rem',
            lineHeight: 1.5,
          }}
        >
          {pet.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PetCard;
