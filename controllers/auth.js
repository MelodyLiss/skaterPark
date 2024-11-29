const jwt = require('jsonwebtoken');
const { login } = require('../services/auth');

const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await login(email, password);

        if (!token) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Decodificar el token para obtener el ID del usuario y rol
        const decodedToken = jwt.decode(token);

        // Establecer el token en la cookie
        res.cookie('token', token, { 
            httpOnly: true, // La cookie solo puede ser accedida por el servidor
            secure: process.env.NODE_ENV === 'production', // Solo habilitar el secure en producción
            maxAge: 3600000 // 1 hora de expiración
        });

        if (decodedToken.rol === 1) {
            return res.redirect('/skaterpark/auth/admin');
        } else if (decodedToken.rol === 3) {
            return res.redirect(`/skaterpark/skaters/${decodedToken.id}`);
        }

        return res.redirect('/login'); 

    } catch (err) {
        console.error(err);
        return res.status(400).render('login', { message: 'Error al procesar la solicitud, intenta nuevamente.' });
    }
};

const perfilController = (req, res) => {
    const userId = req.params.id;

    if (userId !== req.user.id) {
        return res.status(403).json({ message: 'Acceso no autorizado.' });
    }

    res.render('panelSkater', { user: req.user });
};


module.exports ={
    loginController,perfilController
}

