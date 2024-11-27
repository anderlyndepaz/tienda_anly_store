const Usuario = require('./Usuario');

async function createUser(nombre, apellido, correo_electronico, direccion, numero_telefono, contraseña, rol = 'usuario') {
    try {
        const newUser = await Usuario.create({
            nombre,
            apellido,
            correo_electronico,
            direccion,
            numero_telefono,
            contraseña,
            rol,
        });
        return newUser; 
    } catch (error) {
        throw new Error('Error al crear el usuario: ' + error.message);
    }
}


async function findUserByEmail(correo_electronico) {
    try {
        const user = await Usuario.findOne({
            where: { correo_electronico },
        });
        return user;  
    } catch (error) {
        throw new Error('Error al buscar el usuario: ' + error.message);
    }
}

module.exports = { createUser, findUserByEmail };
