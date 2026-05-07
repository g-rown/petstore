import React from 'react';
import { Card, Box, CardMedia, Typography, IconButton, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';

const CartItemCard = ({ cartItem, onRemove, isRemoving }) => {
  const item = cartItem;
  const isAvailable = item.status === 'AVAILABLE';

  return (
    <Card sx={{ display: 'flex', mb: 2, p: 2, borderRadius: 3 }}>
      <Box sx={{ width: 120, height: 120, flexShrink: 0, mr: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: '100%', height: '100%', borderRadius: 2, objectFit: 'cover' }}
          image={item.petImageUrl || 'https://via.placeholder.com/150'}
          alt={item.petName}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography 
              component={Link} 
              to={`/pets/${item.petId}`}
              variant="h6" 
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              {item.petName}
            </Typography>
            {!isAvailable && (
              <Chip size="small" label={`No longer available (${item.status})`} color="error" sx={{ mt: 0.5 }} />
            )}
          </Box>
          <Typography variant="h6" color="primary.main" fontWeight={700}>
            {formatPrice(item.price)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton 
            color="error" 
            onClick={() => onRemove(item.id)} 
            disabled={isRemoving}
            aria-label="remove item"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default CartItemCard;
