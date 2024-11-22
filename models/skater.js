const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion');

// Definir el modelo Skater
const Skater = sequelize.define('Skater', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    anos_experiencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false // Valor predeterminado en false
    },
}, {
    tableName: 'skaters',
    timestamps: false
});

module.exports = Skater;

// Función para sincronizar el modelo Skater con la base de datos
const syncModel = async () => {
    try {
        await sequelize.sync({ alter: true }); // Sincroniza el modelo (alterará la tabla si es necesario)
        console.log('La tabla ha sido sincronizada correctamente.');
    } catch (error) {
        console.error('Hubo un error al sincronizar la tabla', error);
    }
}

// Llamada a la función de sincronización
syncModel();
