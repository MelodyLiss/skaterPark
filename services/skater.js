const Skater = require('../models/skater');
const { Op ,Sequelize } = require('sequelize');

const findAllSkaters = async () => {
    try {
        const skaters = await Skater.findAll();

        if(skaters.length==0){
            return {
                msg: 'no hay skaters registrados',
                status: 204,
                datos: []
            }
        }return{
            msg:'Listado de skaters registrados',
            status:200,
            datos: skaters.map(skater =>skater.toJSON())
        }

    } catch (error) {
        console.log(error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
    }
}
};

const findByAttributeSkaters = async (clave,valor) => {
    try {
        let condiciones = {}; // debo iniciar las condiciones como un objeto
        if (clave === 'id' || clave === 'anos_experiencia') {
            condiciones[clave] = parseInt(valor, 10); // Tuve que parcearlo porque me lo convertía en string
        } else {
            //debo asegurarme de habilitar el 'unaccent' desde la consola de pg con esto --> CREATE EXTENSION IF NOT EXISTS unaccent;
            condiciones = Sequelize.where(
                Sequelize.fn('unaccent', Sequelize.col(`Skater.${clave}`)), //unaccent propio de pg para eliminar acentos c:
                { [Op.iLike]: Sequelize.fn('unaccent', `%${valor}%`) }
            );
        }
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
    }
    }
}

const updateSkater = async (id,email,nombre,password,anos_experiencia,especialidad,foto,estado) => {
    try {
        const skater = await Skater.findByPk(id);

    if(!skater){
        return {
            msg: `No se ha encontrado el/la skater asociado al id ${id}`,
            status: 204,
            datos: []
        }
    }

    if(skater){
        if(email){
            skater.email=email;
        }
        if(nombre){
            skater.nombre=nombre;
        }
        if(password){
            skater.password=password;
        }
        if(anos_experiencia){
            skater.anos_experiencia=anos_experiencia;
        }
        if(especialidad){
            skater.especialidad=especialidad;
        }
        if(foto){
            skater.foto=foto;
        }
        if(estado){
            skater.estado=estado;
        }
    }

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
        }
    }
};

const createSkater = async (email,nombre,password,anos_experiencia,especialidad,foto) => {
    try {
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
        const skater = Skater.destroy({where:{id}});
        const skaters = await Skater.findAll();
        return {
            msg: `El/la skater asociado al id ${id} ha sido eliminado correctamente.`,
            status: 200,
            datos: skaters.map(skater =>skater.toJSON())
        };

    } catch (error) {
        console.log(error.message);
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
    
}


module.exports ={
    findAllSkaters,
    findByAttributeSkaters,
    updateSkater,
    createSkater,
    deleteSkater,
};




