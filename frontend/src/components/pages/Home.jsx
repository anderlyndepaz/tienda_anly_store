import React, { useEffect, useState } from 'react';
import { getArticulos } from '../../../services/api';
import '../../../styles/Home.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [articulos, setArticulos] = useState([]);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0); 

  // Cargar datos del usuario al iniciar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:3000/api/usuarios', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser({ id: response.data.id, nombre: response.data.nombre, rol: 'usuario' });
        })
        .catch((err) => {
          console.error('Error al obtener datos del usuario:', err);
        });
    }
  }, []);

  // Cargar artículos y sincronizar la cesta al montar el componente
  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const data = await getArticulos();
        setArticulos(data);
      } catch (error) {
        console.error('Error al cargar los artículos:', error);
      }
    };

    fetchArticulos();

    // Sincronizar el contador de la cesta desde localStorage
    const cesta = JSON.parse(localStorage.getItem('cesta')) || [];
    setCartCount(cesta.length);
  }, []);

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/auth/logout');
      localStorage.removeItem('token');
      setUser(null);
      alert('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión');
    }
  };



  // Crear un pedido desde la cesta
  const addToCesta = async () => {
    try {
      const articulosEnCesta = JSON.parse(localStorage.getItem('cesta')) || [];
      if (articulosEnCesta.length === 0) {
        throw new Error('No hay artículos en la cesta');
      }

      const cuenta_pagar = articulosEnCesta.reduce((total, articulo) => total + articulo.precio, 0);
      const cantidad = articulosEnCesta.length;

      console.log('Cantidad:', cantidad);
      console.log('Cuenta a pagar:', cuenta_pagar);

      const response = await axios.post(
        'http://localhost:3000/api/pedidos/create',
        { cantidad, cuenta_pagar },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      console.log('Pedido añadido correctamente:', response.data);
    } catch (error) {
      console.error('Error al añadir el pedido:', error.message);
    }
  };

    // Añadir un artículo a la cesta
    const handleAddToCesta = (articulo) => {
      let cesta = JSON.parse(localStorage.getItem('cesta')) || [];
      cesta.push(articulo);
      localStorage.setItem('cesta', JSON.stringify(cesta));
      setCartCount(cesta.length); // Actualiza el contador en tiempo real
      console.log('Artículo añadido a la cesta:', articulo);
    };

  return (
    <div className="home-container">
      <div className="auth-buttons">
        {user ? (
          <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="login-button">Iniciar sesión</button>
            </Link>
            <Link to="/registro">
              <button className="register-button">Registrarse</button>
            </Link>
          </>
        )}
        <Link to="/cesta">
          <button className="cart-button">Cesta ({cartCount})</button>
        </Link>
      </div>
      <h1>Bienvenidos a tu tienda de confianza</h1>
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
            <button
              onClick={() => handleAddToCesta(articulo)}
              className="add-to-cart-button"
            >
              Añadir a la cesta
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
