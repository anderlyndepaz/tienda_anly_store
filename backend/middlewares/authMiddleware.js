const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.status(403).send('Token no proporcionado');
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).send('Token inválido');
//         }
//         req.user = user;
//         next();
//     });
// }

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Token en el header Authorization
  if (!token) {
    return res.status(403).send('Token no proporcionado');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Token inválido');
    }
    req.user = user;
    next();
  });
}

// module

const getUserIdFromToken = (req) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Se asume que el token está en el encabezado Authorization
    if (!token) {
      throw new Error('Token no proporcionado');
    }
  
    try {
      const decoded = jwt.verify(token, 'tu_clave_secreta'); // Verifica y decodifica el token
      return decoded.id; // Suponiendo que el ID está en el campo 'id' del payload
    } catch (err) {
      throw new Error('Token inválido');
    }
  };
  

  const authMiddleware = (req, res, next) => {
    try {
      const userId = getUserIdFromToken(req);
      req.userId = userId; // Lo puedes almacenar en req.userId para usarlo más tarde
      next();
    } catch (error) {
      res.status(401).send({ message: 'No autorizado' });
    }
  };

module.exports = authenticateToken;
