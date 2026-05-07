import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartItemCard from '../components/cart/CartItemCard';
import CartSummary from '../components/cart/CartSummary';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartPage = () => {
  const { items, isLoading, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = async (id) => {
    setRemovingId(id);
    await removeFromCart(id);
    setRemovingId(null);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (isLoading) return <LoadingSpinner label="Loading your cart..." />;

  if (!items || items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingCartIcon sx={{ fontSize: 60, color: 'text.disabled' }} />}
        title="Your cart is empty"
        message="Looks like you haven't added any furry friends to your cart yet."
        actionText="Start Shopping"
        actionLink="/catalog"
      />
    );
  }

  return (
    <Box>
      <Typography variant="h3" component="h1" fontWeight={800} mb={4}>
        Shopping Cart
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {items.map(item => (
            <CartItemCard 
              key={item.id} 
              cartItem={item} 
              onRemove={handleRemove}
              isRemoving={removingId === item.id}
            />
          ))}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <CartSummary items={items} onCheckout={handleCheckout} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
