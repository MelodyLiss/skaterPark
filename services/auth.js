const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Skater = require('../models/skater');
const Usuario = require('../models/usuario');

// Función que busca un usuario por correo (Usuario o Skater)
const findUserByEmail = async (email) => {
    let user = await Usuario.findOne({ where: { email } });

    if (!user) {
        user = await Skater.findOne({ where: { email } });
    }
    return user;
};


const login = async (email, password) => {
    try {
        const user = await findUserByEmail(email);

        if (!user) {
            throw new Error('Credenciales inválidas.');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Credenciales inválidas.');
        }

        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                nombre: user.nombre,
                rol: user.rolId
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );
        return token;

    } catch (error) {
        console.error(error.message); 
        throw new Error('Hubo un error en el proceso de login'); 
    }
};

module.exports = { login, findUserByEmail };
