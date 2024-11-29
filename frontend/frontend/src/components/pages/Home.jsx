import React, { useEffect, useState } from 'react';
import { getArticulos } from '../../../services/api';
import '../../../styles/Home.scss';

const Home = () => {
  const [articulos, setArticulos] = useState([]); //variable articulos ES LA QUE CONTIENE LOS DATOS y set es la funcion que actualiza 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ nombre: '', rol: 'usuario' }); // Simulación de datos del usuario
    }
  }, []);

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
       <div className="auth-buttons">
          <a href="/login">
            <button className="login-button">Iniciar sesión</button>
          </a>
          <a href="/registro">
            <button className="register-button">Registrarse</button>
          </a>
        </div>
      <h1>Bienvenido a la página de inicio</h1>
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