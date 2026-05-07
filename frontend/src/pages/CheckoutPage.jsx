import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Divider, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { checkout } from '../api/orderApi';
import { formatPrice } from '../utils/formatters';
import ErrorAlert from '../components/common/ErrorAlert';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CheckoutPage = () => {
  const { items, isLoading: cartLoading, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  if (cartLoading) return <LoadingSpinner label="Loading checkout..." />;

  const availableItems = (items || []).filter(item => item.status === 'AVAILABLE');
  const subtotal = availableItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const response = await checkout();
      clearCart();
      navigate(`/order-confirmation/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error?.message || err.response?.data?.error || 'Failed to place order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (availableItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Box>
      <Typography variant="h3" component="h1" fontWeight={800} mb={4}>
        Checkout
      </Typography>

      {error && <ErrorAlert message={error} title="Checkout Failed" />}

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Order Items ({availableItems.length})
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {availableItems.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    component="img"
                    src={item.petImageUrl}
                    alt={item.petName}
                    sx={{ width: 56, height: 56, borderRadius: 2, objectFit: 'cover' }}
                  />
                  <Typography fontWeight={500}>{item.petName}</Typography>
                </Box>
                <Typography fontWeight={600}>{formatPrice(item.price)}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 24 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Payment Summary
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Subtotal:</Typography>
              <Typography fontWeight={500}>{formatPrice(subtotal)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary">Tax (8%):</Typography>
              <Typography fontWeight={500}>{formatPrice(tax)}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" fontWeight={700}>Total:</Typography>
              <Typography variant="h6" fontWeight={700} color="primary.main">
                {formatPrice(total)}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontStyle: 'italic' }}>
              💳 Payment is simulated — no real charges will be made.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
            >
              {isProcessing ? <CircularProgress size={24} color="inherit" /> : 'Place Order'}
            </Button>

            <Button variant="text" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/cart')}>
              Back to Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
