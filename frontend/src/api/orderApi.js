import axiosInstance from './axiosInstance';

export const checkout = async () => {
  const response = await axiosInstance.post('/orders/checkout');
  return response.data;
};

export const getOrders = async () => {
  const response = await axiosInstance.get('/orders');
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await axiosInstance.get(`/orders/${id}`);
  return response.data;
};
