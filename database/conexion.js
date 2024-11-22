const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:hola123@localhost:5432/skaterProyect')

module.exports = sequelize;

// Función para verificar la conexión
const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('La conexión con la base de datos se ha establecido correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

// Llamada a la función de verificación
checkConnection();