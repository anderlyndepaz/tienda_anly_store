import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Cesta.scss';

const Cesta = ({ setTotal, setCantidad, total, cantidad }) => {
  const [cesta, setCesta] = useState([]);

  useEffect(() => {
    const articulosEnCesta = JSON.parse(localStorage.getItem('cesta')) || [];
    setCesta(articulosEnCesta);
    calcularTotalYCantidad(articulosEnCesta);
  }, []);

  const eliminarArticulo = (idArticulo) => {
    const nuevaCesta = cesta.filter((articulo) => articulo.id_articulos !== idArticulo);
    setCesta(nuevaCesta);
    localStorage.setItem('cesta', JSON.stringify(nuevaCesta));
    calcularTotalYCantidad(nuevaCesta);
  };

  const calcularTotalYCantidad = (articulos) => {
    const totalPagar = articulos.reduce((acc, articulo) => acc + articulo.precio, 0);
    const cantidadArticulos = articulos.length;

    setTotal(totalPagar.toFixed(2));  // Actualiza el estado global
    setCantidad(cantidadArticulos);   // Actualiza el estado global
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
