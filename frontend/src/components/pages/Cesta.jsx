import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Cesta.scss';

const Cesta = () => {
  const [cesta, setCesta] = useState([]);
  const [total, setTotal] = useState(0);
  const [cantidad, setCantidad] = useState(0);

 
  useEffect(() => {
    const articulosEnCesta = JSON.parse(localStorage.getItem('cesta')) || []; //obtener datos o asignar array vacio
    setCesta(articulosEnCesta); //actualizamos con los datos
    calcularTotalYCantidad(articulosEnCesta); 
  }, []);

  const eliminarArticulo = (idArticulo) => {
    const nuevaCesta = cesta.filter((articulo) => articulo.id_articulos !== idArticulo);  //filtramos para identicar por id el articulo
    setCesta(nuevaCesta); //act la cesta
    localStorage.setItem('cesta', JSON.stringify(nuevaCesta)); //guardar en local
    calcularTotalYCantidad(nuevaCesta); //volver a calcular
  };
  
  const calcularTotalYCantidad = (articulos) => {
    const totalPagar = articulos.reduce((acc, articulo) => acc + articulo.precio, 0); //comienza en 0 y se suma el acumulador con art.precio
    const cantidadArticulos = articulos.length; 
  
    setTotal(totalPagar.toFixed(2)); //act el estado solo con dos decimales
    setCantidad(cantidadArticulos); //act el estado
  };
  

  return (
    <div className="cesta-container">
      <div className="cesta-header">
        <h1>Mi Cesta</h1>
        <Link to="/">
          <button className="continue-shopping-button">Seguir comprando</button>
        </Link>
      </div>

      {cesta.length === 0 ? (
        <p>No tienes artículos en la cesta.</p>
      ) : (
        <div className="cesta-items">
          {cesta.map((articulo) => (
            <div key={articulo.id_articulos} className="cesta-item">
              <img src={articulo.imagen} alt={articulo.nombre} className="cesta-item-image" />
              <div className="cesta-item-details">
                <h2>{articulo.nombre}</h2>
                <p>Precio: ${articulo.precio}</p>
                <button onClick={() => eliminarArticulo(articulo.id_articulos)} className="remove-item-button">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cesta.length > 0 && (
        <div className="cesta-summary">
          <h3>Total a pagar: ${total}</h3>
          <h3>Cantidad de artículos: {cantidad}</h3>
          <Link to="/checkout">
            <button className="checkout-button">Proceder al pago</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cesta;
