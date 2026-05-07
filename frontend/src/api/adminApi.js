import axiosInstance from './axiosInstance';

export const getAdminPets = async (params) => {
  const response = await axiosInstance.get('/admin/pets', { params });
  return response.data;
};

export const createPet = async (petData) => {
  const response = await axiosInstance.post('/admin/pets', petData);
  return response.data;
};

export const updatePet = async (id, petData) => {
  const response = await axiosInstance.put(`/admin/pets/${id}`, petData);
  return response.data;
};

export const deletePet = async (id) => {
  const response = await axiosInstance.delete(`/admin/pets/${id}`);
  return response.data;
};
