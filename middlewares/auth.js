const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, no se encontró token.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Guardar los datos decodificados en el request
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};

module.exports = authMiddleware;



