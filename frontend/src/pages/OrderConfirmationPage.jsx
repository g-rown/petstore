import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Paper, Divider, Button, Grid, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getOrderById } from '../api/orderApi';
import { formatPrice, formatDate } from '../utils/formatters';
import LoadingSpinner from '../components/common/LoadingSpinner';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(id);
        setOrder(response.data);
      } catch (err) {
        console.error('Failed to fetch order', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;
  if (!order) return <Typography>Order not found.</Typography>;

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <Box textAlign="center" mb={5}>
        <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h3" fontWeight={800} gutterBottom>
          Order Confirmed!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Thank you for your purchase. Your order #{order.id} has been placed.
        </Typography>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>Order #{order.id}</Typography>
          <Chip label={order.status} color="success" />
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Placed on {formatDate(order.orderDate)}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {order.items.map(item => (
          <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                component="img"
                src={item.petImageUrl}
                alt={item.petName}
                sx={{ width: 50, height: 50, borderRadius: 2, objectFit: 'cover' }}
              />
              <Typography fontWeight={500}>{item.petName}</Typography>
            </Box>
            <Typography fontWeight={600}>{formatPrice(item.priceAtPurchase)}</Typography>
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={700}>Total:</Typography>
          <Typography variant="h6" fontWeight={700} color="primary.main">
            {formatPrice(order.totalAmount)}
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={2} mt={4}>
        <Grid item xs={12} sm={6}>
          <Button component={Link} to="/orders" variant="outlined" fullWidth size="large" sx={{ py: 1.5 }}>
            View All Orders
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button component={Link} to="/catalog" variant="contained" fullWidth size="large" sx={{ py: 1.5 }}>
            Continue Shopping
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderConfirmationPage;
