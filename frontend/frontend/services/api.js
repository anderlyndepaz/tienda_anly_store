import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // proxy configurado en vite.config.js
});


export const getArticulos = async () => {
  try {
    const response = await api.get('/articulos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los artículos:', error);
    throw error;
  }
};
