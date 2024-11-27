const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');  


async function register(req, res) {
    const { nombre, apellido, correo_electronico, direccion, numero_telefono, contraseña, rol } = req.body;
    try {
       
        const existingUser = await findUserByEmail(correo_electronico);
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }
      
        const hashedPassword = await bcrypt.hash(contraseña, 10);

    
        const newUser = await createUser(nombre, apellido, correo_electronico, direccion, numero_telefono, hashedPassword, rol);

        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
}


async function login(req, res) {
    const { correo_electronico, contraseña } = req.body;
    try {
        // Buscar el usuario por su correo electrónico
        const user = await findUserByEmail(correo_electronico);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña es correcta
        const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: user.id_users, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Enviar el token como cookie o en el cuerpo de la respuesta
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
    }
}

function logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
}

module.exports = { register, login, logout };
