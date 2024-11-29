const bcrypt = require('bcryptjs');
const Skater = require('../models/skater');
const { Op ,Sequelize } = require('sequelize');

const findAllSkaters = async () => {
    try {
        const skaters = await Skater.findAll();

        if (skaters.length === 0) {
            return {
                msg: 'No hay skaters registrados',
                status: 204,
                datos: []  
            };
        }

        return {
            msg: 'Listado de skaters registrados',
            status: 200,
            datos: skaters.map(skater => skater.toJSON()) 
        };

    } catch (error) {
        console.log('Error en findAllSkaters:', error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []  
        };
    }
};


const findByAttributeSkaters = async (clave, valor) => {
    try {
        let condiciones = {}; 

        if (clave === 'id') {
            condiciones[clave] = parseInt(valor, 10); // Parseamos'
        } else if (clave === 'anos_experiencia') {
            condiciones[clave] = parseInt(valor, 10); 
        } else {
            //'unaccent' para que elimine acentos
            condiciones = Sequelize.where(
                Sequelize.fn('unaccent', Sequelize.col(`Skater.${clave}`)),
                { [Op.iLike]: Sequelize.fn('unaccent', `%${valor}%`) }
            );
        }

        // findByPk solo cuando se trata de buscar por ID
        if (clave === 'id') {
            const skater = await Skater.findByPk(valor);
            if (!skater) {
                return {
                    msg: `Skater con ID ${valor} no encontrado`,
                    status: 204,
                    datos: []
                };
            }

            return {
                msg: `Búsqueda realizada por ${clave} = ${valor}`,
                status: 201,
                datos: [skater.toJSON()]
            };
        }

        //findAll para el resto
        const skaters = await Skater.findAll({
            where: condiciones
        });

        if (skaters.length === 0) {
            return {
                msg: `No se encontraron resultados para ${clave} = ${valor}`,
                status: 204,
                datos: []
            };
        }

        return {
            msg: `Búsqueda realizada por ${clave} = ${valor}`,
            status: 201,
            datos: skaters.map(skater => skater.toJSON()) 
        };
    } catch (error) {
        console.log(error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        };
    }
};


const updateSkater = async (id, email, nombre, password, anos_experiencia, especialidad, foto, estado) => {
    try {
        const skater = await Skater.findByPk(id);

        if (!skater) {
            return {
                msg: `No se ha encontrado el/la skater asociado al id ${id}`,
                status: 204,
                datos: []
            };
        }

        // Solo actualiza los campos que no sean null o undefined
        if (email) {
            skater.email = email;
        }
        if (nombre) {
            skater.nombre = nombre;
        }
        if (password) {
            skater.password = password;
        }
        if (anos_experiencia) {
            skater.anos_experiencia = anos_experiencia;
        }
        if (especialidad) {
            skater.especialidad = especialidad;
        }
        if (foto) {
            skater.foto = foto;
        }
        if (estado !== undefined) { 
            skater.estado = estado;
        }

        // Guarda solo los cambios realizados
        await skater.save();

        return {
            msg: 'Skater actualizado con éxito',
            status: 200,
            datos: skater.toJSON()
        };

    } catch (error) {
        console.log(error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        };
    }
};


const createSkater = async (email,nombre,password,anos_experiencia,especialidad,foto) => {
    try {

        // Encriptación
        const salt = await bcrypt.genSalt(10); // El número 10 es el número de rondas de salting
        password = await bcrypt.hash(password, salt); // Se genera el hash

        const nuevoSkater = await Skater.create({
            email,nombre,password,anos_experiencia,especialidad,foto
        });

        return {
            msg: 'Skater creado con éxito',
            status: 201,
            datos: nuevoSkater.toJSON()
        };

    } catch (error) {
        console.log(error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
};

const deleteSkater = async (id) => {
    try {
        // Verifica que el skater existe
        const skater = await Skater.findByPk(id);
        if (!skater) {
            return {
                msg: `El skater con ID ${id} no existe.`,
                status: 404,
                datos: []
            };
        }

        await Skater.destroy({ where: { id } });

        const skaters = await Skater.findAll();

        return {
            msg: `El skater con ID ${id} ha sido eliminado correctamente.`,
            status: 200,
            datos: skaters.map(skater => skater.toJSON())
        };
    } catch (error) {
        console.error(error.message);
        return {
            msg: 'Error en el servidor al intentar eliminar el skater.',
            status: 500,
            datos: []
        };
    }
};



module.exports ={
    
    findAllSkaters,
    findByAttributeSkaters,
    updateSkater,
    createSkater,
    deleteSkater,
};




