const jwt = require('jsonwebtoken');
require('dotenv').config();


const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; //cookie-parser para acceder a la cookie

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, no se encontró token.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
        req.user = decoded;  
        next();  
    } catch (err) {
        res.status(401).json({ message: 'Token inválido.' });
    }
};

module.exports = authMiddleware;



