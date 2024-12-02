import React, { useEffect, useState } from 'react';
import { getArticulos } from '../../../services/api';
import '../../../styles/Home.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = ({ total, cantidad }) => {
  const [articulos, setArticulos] = useState([]); // para almacenar los artículos de la API
  const [user, setUser] = useState(null); // información del usuario logeado
  const [cartCount, setCartCount] = useState(0); // conteo de artículos en la cesta
  const [searchTerm, setSearchTerm] = useState(''); // estado para el término de búsqueda

  // cargar datos del usuario, para el token
  useEffect(() => {
    const token = localStorage.getItem('token'); // obtener token
    if (token) {
      axios
        .get('http://localhost:3000/api/usuarios', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const usuario = { id: response.data.id, nombre: response.data.nombre, rol: 'usuario' };
          setUser(usuario); // actualizamos el estado del usuario

          // Crear el pedido para el usuario autenticado
          createPedido(usuario.id, token);
        })
        .catch((err) => {
          console.error('Error al obtener datos del usuario:', err);
        });
    }
  }, []);

  // para crear pedido para el usuario autenticado
  const createPedido = async (userId, token) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/pedidos',
        {
          cantidad: cantidad,
          cuenta_pagar: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Pedido creado exitosamente:', response.data);
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };

  // cargar artículos y sincronizar la cesta al montar el componente
  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const data = await getArticulos();
        setArticulos(data); //actualiza estado con datos
      } catch (error) {
        console.error('Error al cargar los artículos:', error);
      }
    };

    fetchArticulos();

    // sincronizar el contador de la cesta desde localStorage
    const cesta = JSON.parse(localStorage.getItem('cesta')) || [];
    setCartCount(cesta.length);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/auth/logout');
      localStorage.removeItem('token');
      setUser(null); //act a null - ya no esta autenticado
      alert('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión');
    }
  };

  const handleAddToCesta = (articulo) => {
    if (!user) {
      // Si no hay usuario logeado, muestra un mensaje o redirige al login
      alert('Por favor, inicia sesión para añadir productos a la cesta.');
      return; // Detiene la ejecución de la función si el usuario no está logeado
    }
  
    let cesta = JSON.parse(localStorage.getItem('cesta')) || [];
    cesta.push(articulo);
    localStorage.setItem('cesta', JSON.stringify(cesta));
    setCartCount(cesta.length); // actualiza el contador en tiempo real
    console.log('Artículo añadido a la cesta:', articulo);
  };

  // Filtrar los artículos según el término de búsqueda
  const filteredArticulos = articulos.filter((articulo) => {
    return (
      articulo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      articulo.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
      <div className="contenedor-input">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre o categoría"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // actualiza el término de búsqueda
        />
      </div>

      <div className="articulos-grid">
        {filteredArticulos.length > 0 ? (
          filteredArticulos.map((articulo) => (
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
          ))
        ) : (
          <p>No se encontraron artículos</p>
        )}
      </div>
    </div>
  );
};

export default Home;



