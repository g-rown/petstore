import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setItems([]);
      setItemCount(0);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/cart');
      const cartItems = response.data.data || [];
      setItems(cartItems);
      setItemCount(cartItems.length);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (petId) => {
    try {
      const response = await axiosInstance.post('/cart/items', { petId });
      const cartItems = response.data.data;
      setItems(cartItems);
      setItemCount(cartItems.length);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add to cart' 
      };
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axiosInstance.delete(`/cart/items/${cartItemId}`);
      const newItems = items.filter(item => item.id !== cartItemId);
      setItems(newItems);
      setItemCount(newItems.length);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to remove from cart' 
      };
    }
  };

  const clearCart = () => {
    setItems([]);
    setItemCount(0);
  };

  return (
    <CartContext.Provider value={{ items, itemCount, isLoading, fetchCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
