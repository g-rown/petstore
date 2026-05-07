import React from 'react';
import { Paper, Typography, Box, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';

const CartSummary = ({ items, onCheckout, isCheckingOut }) => {
  const navigate = useNavigate();
  
  const availableItems = items.filter(item => item.status === 'AVAILABLE');
  const subtotal = availableItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + tax;

  const hasUnavailableItems = items.length !== availableItems.length;

  return (
    <Paper sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 24 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Order Summary
      </Typography>
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography color="text.secondary">Items ({availableItems.length}):</Typography>
        <Typography fontWeight={500}>{formatPrice(subtotal)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography color="text.secondary">Estimated Tax:</Typography>
        <Typography fontWeight={500}>{formatPrice(tax)}</Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" fontWeight={700}>Total:</Typography>
        <Typography variant="h6" fontWeight={700} color="primary.main">
          {formatPrice(total)}
        </Typography>
      </Box>

      {hasUnavailableItems && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          Some items in your cart are no longer available and will not be included in checkout. Please remove them.
        </Typography>
      )}

      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        size="large"
        disabled={availableItems.length === 0 || isCheckingOut}
        onClick={onCheckout}
        sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
      >
        Proceed to Checkout
      </Button>

      <Button
        variant="text"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => navigate('/catalog')}
      >
        Continue Shopping
      </Button>
    </Paper>
  );
};

export default CartSummary;
