import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CestaPage = () => {
  const [cesta, setCesta] = useState([]);
  const [pedido, setPedido] = useState(null);
  
  const id_usuario = 1; 

  useEffect(() => {
    // Obtener los artículos en la cesta y el pedido
    const fetchCestaAndPedido = async () => {
      try {
        const response = await axios.get(`/api/cesta/${id_usuario}`);
        setCesta(response.data);
        
        // Suponiendo que también tienes un endpoint para obtener el último pedido
        const pedidoResponse = await axios.get(`/api/pedido/${id_usuario}`);
        setPedido(pedidoResponse.data);
      } catch (error) {
        console.error('Error al cargar la cesta y el pedido:', error);
      }
    };

    fetchCestaAndPedido();
  }, [id_usuario]);

  return (
    <div>
      <h1>Mi Cesta</h1>
      <div>
        {cesta.map((item) => (
          <div key={item.id_articulos}>
            <p>{item.articulo.nombre} - ${item.articulo.precio}</p>
          </div>
        ))}
      </div>

      {pedido && (
        <div>
          <h2>Pedido</h2>
          <p>Cantidad de artículos: {pedido.cantidad}</p>
          <p>Total a pagar: ${pedido.cantidad_pagar}</p>
          <p>Fecha del pedido: {new Date(pedido.fecha_pedido).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default CestaPage;
