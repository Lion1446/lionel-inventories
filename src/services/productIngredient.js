import axios from 'axios';

const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8000',
  baseURL: 'https://lionel-inventories.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProductIngredients = async () => {
  const { data } = await axiosInstance.get('/productItems');
  return data;
};

export const addProductIngredient = async (productIngredient) => {
  return axiosInstance.post('/productItems', productIngredient);
};

export const editProductIngredient = async (data) => {
  return axiosInstance.patch(`/productItems/${data.updatedProduct.id}`, data.updatedProduct);
};

export const deleteProductIngredient = async (id) => {
  return axiosInstance.delete(`/productItems/${id}`);
};