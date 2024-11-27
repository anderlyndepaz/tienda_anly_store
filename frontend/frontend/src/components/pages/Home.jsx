import React, { useEffect, useState } from 'react';
import { getArticulos } from '../../../services/api';
import '../../../styles/Home.scss';

const Home = () => {
  const [articulos, setArticulos] = useState([]); //variable articulos ES LA QUE CONTIENE LOS DATOS y set es la funcion que actualiza 

  useEffect(() => {   // es un hook dahh. renderiza 
    const fetchArticulos = async () => {
      try {
        const data = await getArticulos();
        setArticulos(data);
      } catch (error) {
        console.error('Error al cargar los artículos:', error);
      }
    };

    fetchArticulos();  //llamala porque sino no funciona mi linda 
  }, []);

  
  return (
    <div className="home-container">
      <h1 className="home-title">Lista de Artículos</h1>
      <div className="articulos-grid">
        {articulos.map((articulo) => (
          <div key={articulo.id_articulos} className="articulo-card">
            <img 
              src={articulo.imagen} 
              alt={articulo.nombre} 
              className="articulo-image" 
            />
            <h2 className="articulo-name">{articulo.nombre}</h2>
            <p className="articulo-category">Categoría: {articulo.categoria}</p>
            <p className="articulo-price">Precio: ${articulo.precio}</p>
            <p className="articulo-description">{articulo.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;