import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Divider, Chip, Collapse, IconButton, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { getOrders } from '../api/orderApi';
import { formatPrice, formatDate } from '../utils/formatters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (isLoading) return <LoadingSpinner label="Loading your orders..." />;

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        icon={<ReceiptLongIcon sx={{ fontSize: 60, color: 'text.disabled' }} />}
        title="No Orders Yet"
        message="You haven't placed any orders yet. Start shopping to see your order history here."
        actionText="Browse Catalog"
        actionLink="/catalog"
      />
    );
  }

  const statusColor = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'success';
      case 'SHIPPED': return 'info';
      case 'DELIVERED': return 'primary';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h3" component="h1" fontWeight={800} mb={4}>
        Order History
      </Typography>

      {orders.map(order => (
        <Paper key={order.id} sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
          <Box 
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, cursor: 'pointer' }}
            onClick={() => toggleExpand(order.id)}
          >
            <Box>
              <Typography variant="h6" fontWeight={600}>Order #{order.id}</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(order.orderDate)} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip label={order.status} color={statusColor(order.status)} size="small" />
              <Typography variant="h6" fontWeight={700} color="primary.main">
                {formatPrice(order.totalAmount)}
              </Typography>
              <IconButton size="small">
                {expandedOrder === order.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
          </Box>

          <Collapse in={expandedOrder === order.id}>
            <Divider />
            <Box p={3} bgcolor="grey.50">
              {order.items.map(item => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={item.petImageUrl}
                      alt={item.petName}
                      sx={{ width: 48, height: 48, borderRadius: 2, objectFit: 'cover' }}
                    />
                    <Typography fontWeight={500}>{item.petName}</Typography>
                  </Box>
                  <Typography fontWeight={600}>{formatPrice(item.priceAtPurchase)}</Typography>
                </Box>
              ))}
            </Box>
          </Collapse>
        </Paper>
      ))}
    </Box>
  );
};

export default OrderHistoryPage;
