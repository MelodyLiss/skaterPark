const path = require('path');
const { validationResult } = require('express-validator');
const { createSkater, findByAttributeSkaters,findAllSkaters, deleteSkater,updateSkater} = require('../services/skater'); 


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
        res.render('panelSkater', { skater});

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
};
const findAllSkatersController = async (req, res) => {
        const respuesta = await findAllSkaters();
        
        if (req.user && req.user.rol === 1) {
            const skaters = respuesta.datos;
            res.render('panelAdmin', { skaters: skaters });
        } else {
            const activeSkaters = respuesta.datos.filter(skater => skater.estado === true);
            res.render('panelParticipantes', { skaters: activeSkaters });
        }
};

const deleteSkaterController = async (req, res) => {
    const { id } = req.query;

    try {
        const respuesta = await deleteSkater(id);

        res.render('panelAdmin', {
            skaters: respuesta.datos,
            msg: respuesta.msg
        });
    } catch (err) {
        console.error('Error en deleteSkaterController:', err.message);
        res.status(500).send('Error al procesar la solicitud.');
    }
};


const updateEstadoController = async (req, res) => {
    const { id, estado } = req.body; 

    try {
        // Los null no serán actualizados :D
        const respuesta = await updateSkater(id, null, null, null, null, null, null, estado);

        if (respuesta.status === 200) {
            res.status(200).json({ msg: respuesta.msg });
        } else {
            res.status(respuesta.status).json({ msg: respuesta.msg });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Error al actualizar el estado' });
    }
};



module.exports = { createSkaterController,SkaterProfileController,findAllSkatersController,deleteSkaterController,updateEstadoController};
