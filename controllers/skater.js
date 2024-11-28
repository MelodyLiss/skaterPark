const path = require('path');
const { validationResult } = require('express-validator');
const { createSkater, findByAttributeSkaters } = require('../services/skater'); 


const createSkaterController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: 'Errores de validación',
            errores: errors.array(),
        });
    }

    const { email, nombre, password, anos_experiencia, especialidad } = req.body;
    const foto = req.files?.foto;

    if (!foto) {
        return res.status(400).json({ msg: 'La foto es obligatoria' });
    }

    try {
        const fotoNombre = `${Date.now()}-${foto.name}`;
        const fotoPath = path.join(__dirname, '../public/uploads', fotoNombre);
        foto.mv(fotoPath, async (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ msg: 'Error al subir la foto' });
            }

            try {
                const respuesta = await createSkater( email,nombre,password,anos_experiencia,especialidad,`uploads/${fotoNombre}`);

                return res.redirect(`/skaterpark/skaters/${respuesta.datos.id}`);
            } catch (error) {
                console.error(error.message);
                return res.status(500).json({
                    msg: 'Error al crear el skater en la base de datos',
                });
            }
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            msg: 'Error en el servidor',
        });
    }
};

const SkaterProfileController = async (req, res) => {
    const { id } = req.params;

    try {
        const respuesta = await findByAttributeSkaters('id', id);

        if (respuesta.status === 204) {
            return res.status(404).json({ msg: 'Skater no encontrado' });
        }

        const skater = respuesta.datos[0];
        res.render('panelSkater', { skater });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
};



module.exports = { createSkaterController,SkaterProfileController  };
