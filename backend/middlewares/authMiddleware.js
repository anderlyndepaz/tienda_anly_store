const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
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

module.exports = authenticateToken;
