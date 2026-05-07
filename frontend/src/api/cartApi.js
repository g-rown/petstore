import axiosInstance from './axiosInstance';

export const getCart = async () => {
  const response = await axiosInstance.get('/cart');
  return response.data;
};

export const addToCart = async (petId) => {
  const response = await axiosInstance.post('/cart/items', { petId });
  return response.data;
};

export const removeFromCart = async (cartItemId) => {
  const response = await axiosInstance.delete(`/cart/items/${cartItemId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await axiosInstance.delete('/cart');
  return response.data;
};
