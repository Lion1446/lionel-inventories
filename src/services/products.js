import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: 'https://lionel-inventories.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async () => {
  const { data } = await axiosInstance.get('/products');
  return data;
};

export const addProduct = async (product) => {
  const productWithSKU = { ...product, sku: generateSKU() };
  return axiosInstance.post('/products', productWithSKU);
};

export const editProduct = async (data) => {
  return axiosInstance.patch(`/products/${data.updatedProduct.id}`, data.updatedProduct);
};

export const deleteProduct = async (id) => {
  return axiosInstance.delete(`/products/${id}`);
};


function generateSKU() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';

  let randomLetters = '';
  let randomDigits = '';

  for (let i = 0; i < 3; i++) {
    randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
    randomDigits += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return `${randomLetters}-${randomDigits}`;
}
