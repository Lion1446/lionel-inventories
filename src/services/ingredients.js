import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchIngredients = async () => {
  const { data } = await axiosInstance.get('/ingredients');
  return data;
};

export const addIngredient = async (ingredient) => {
  const ingredientWithSKU = { ...ingredient, sku: generateSKU() };
  return axiosInstance.post('/ingredients', ingredientWithSKU);
};

export const editIngredient = async (data) => {
  return axiosInstance.patch(`/ingredients/${data.id}`, data);
};

export const deleteIngredient = async (id) => {
  return axiosInstance.delete(`/ingredients/${id}`);
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
