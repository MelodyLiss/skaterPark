const jwt = require('jsonwebtoken');
const { login } = require('../services/auth');

const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await login(email, password);        
        const { id } = jwt.decode(token); // Decodificar el token para obtener el ID del usuario
        // Guardar el token en una cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res.redirect(`/skaterpark/skaters/${id}`);
    } catch (err) {
        res.status(400).render('login', { message: err.message }); 
    }
};

const perfilController = (req, res) => {
    const userId = req.params.id;

    if (userId !== req.user.id) {
        return res.status(403).json({ message: 'Acceso no autorizado.' });
    }

    res.render('panelSkater', { user: req.user });
};

module.exports = { loginController,perfilController };
