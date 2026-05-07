import axiosInstance from './axiosInstance';

export const getPets = async (params) => {
  const response = await axiosInstance.get('/pets', { params });
  return response.data;
};

export const getPetById = async (id) => {
  const response = await axiosInstance.get(`/pets/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get('/categories');
  return response.data;
};
