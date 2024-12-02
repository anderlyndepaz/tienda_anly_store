import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  withCredentials: true, 
});


export const getArticulos = async () => {
  try {
    const response = await api.get('/api/articulos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los artículos:', error);
    throw error;
  }
};


export default api;