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



const pagar = async (id_usuario) => {
  try {
    const response = await axios.post('/api/pagar', {
      id_usuario,
    });
    console.log('Pedido realizado con éxito:', response.data);
  } catch (error) {
    console.error('Error al realizar el pedido:', error);
  }
};

// Llamada a la función en tu componente cuando el usuario haga click en "Pagar"
const handlePagarClick = () => {
  const id_usuario = 1; // Suponiendo que tienes el ID del usuario
  pagar(id_usuario);
};