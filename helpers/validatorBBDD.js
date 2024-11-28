// helpers/validator-bd.js
const Rol = require('../models/roles');

// Verificar si el rol existe en la base de datos
const rolExiste = async (rol) => {
    const existeRol = await Rol.findOne({ where: { rol } });
    if (!existeRol) {
        res.status().jon({msg:`El rol ${rol} no está registrado en la base de datos`});
    }
};

// Verificar si el nombre de usuario ya está registrado
const existeNombreUsuario = async (Model,nombreUsuario) => {
    try {
        const existe = await Model.findOne({ where: { nombreUsuario } });
        if (existe) {
            return res.status(400).json({ msg: `El nombre de usuario ${nombreUsuario} ya está en uso` });
        }
    } catch (error) {
        console.error('Error al verificar el nombre de usuario:', error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Verificar si el correo ya está registrado
const existeCorreo = async (Model,correo) => {
    const existe = await Model.findOne({ where: { correo } });
    if (existe) {
        res.status().jon({msg:`El correo ${correo} ya está registrado`});
    }
};

module.exports = {
    rolExiste,
    existeNombreUsuario,
    existeCorreo
};
