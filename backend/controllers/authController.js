const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');  


async function register(req, res) {
    const { nombre, apellido, correo_electronico, direccion, numero_telefono, contraseña, rol } = req.body; //datos para crear nuevo usuario
    try {
        const existingUser = await findUserByEmail(correo_electronico); //buscamos correo si ya existe
        if (existingUser) { //sino es null, no se regista. existe
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }
        const hashedPassword = await bcrypt.hash(contraseña, 10); //mas alto el numero mas seguro el hash, tome mas tiempo
        const newUser = await createUser(nombre, apellido, correo_electronico, direccion, numero_telefono, hashedPassword, rol);
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
}



async function login(req, res) {
    const { correo_electronico, contraseña } = req.body;
    try {
        const user = await findUserByEmail(correo_electronico);
        if (!user) { 
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        // generar el token
        const token = jwt.sign({ id: user.id_users, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // configurar la cookie con el token
        res.cookie('token', token, { 
            httpOnly: true,  //para que la cookie no sea accesible al cliente
            secure: false, //no tiene que ser enviada solo por conexiones seguras (mala idea en produccion)
            maxAge: 3600000, // 1 hora
          });          
          res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            token, 
            user: { id: user.id_users, nombre: user.nombre, rol: user.rol }
        });        
    } catch (error) {
        console.error('Error en el login:', error.message);
        res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
    }
}



function logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
}

module.exports = { register, login, logout };
