import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Registro.scss'

const RegistroPage = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo_electronico, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [numero_telefono, setNumeroTelefono] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

      
        if (!nombre || !apellido || !correo_electronico || !direccion || !numero_telefono || !contraseña) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    correo_electronico,
                    direccion,
                    contraseña,
                    numero_telefono,
                    rol: 'usuario',
                }),
            });

            const data = await response.json();

            if (response.ok) {
              
                navigate('/login');
            } else {
                setError(data.message || 'Hubo un error al registrar el usuario.');
            }
        } catch (err) {
            setError('Error en la conexión al servidor.');
        }
    };

    return (
        <div className="registro-container">
            <h1>Registro de Usuario</h1>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="registro-form">
                <div>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="apellido">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="correo_electronico">Correo Electrónico</label>
                    <input
                        type="email"
                        id="correo_electronico"
                        value={correo_electronico}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="direccion">Dirección</label>
                    <input
                        type="text"
                        id="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="numero_telefono">Número de Teléfono</label>
                    <input
                        type="tel"
                        id="numero_telefono"
                        value={numero_telefono}
                        onChange={(e) => setNumeroTelefono(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contraseña">Contraseña</label>
                    <input
                        type="password"
                        id="contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegistroPage;
