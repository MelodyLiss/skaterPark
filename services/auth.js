// service/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findByAttributeSkaters } = require('./skater');

const login = async (email, password) => {
    try {
        const result = await findByAttributeSkaters('email', email);
        if (result.status === 204) {
            throw new Error('Credenciales inválidas.');
        }

        const skater = result.datos[0];
        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, skater.password);
        if (!isMatch) {
            throw new Error('Credenciales inválidas.');
        }

        const token = jwt.sign(
            { id: skater.id, email: skater.email, nombre: skater.nombre ,rol: skater.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );
        return token;

    } catch (error) {
        console.error(error.message); 
        throw new Error('Hubo un error en el proceso de login'); 
    }
};


module.exports = { login };
