import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Para redirigir al Home

const LoginPage = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Para redirigir a la página de inicio

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos
        if (!correo || !contraseña) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                correo_electronico: correo,
                contraseña,
            });

            // Si el login es exitoso, guarda el token y redirige al Home
            if (response.data?.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/'); // Cambia la redirección a la ruta raíz
            } else {
                throw new Error('Token no recibido.'); // Maneja el caso de respuesta incorrecta
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Correo electrónico o contraseña incorrectos.');
            } else {
                setError('Hubo un problema al iniciar sesión. Intenta de nuevo más tarde.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="auth-buttons">
                <Link to="/registro">
                    <button>Registrarse</button>
                </Link>
            </div>
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <label htmlFor="correo">Correo electrónico:</label>
                    <input
                        type="email"
                        id="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contraseña">Contraseña:</label>
                    <input
                        type="password"
                        id="contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default LoginPage;
