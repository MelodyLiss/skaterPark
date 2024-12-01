const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion');
const Rol = require('./roles')

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
        type: DataTypes.STRING(255),
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
        defaultValue: false
    },
    
    rolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        },
        defaultValue: 2 //rol skater 
    }

}, {
    tableName: 'skaters',
    timestamps: false
});


// Relación con el modelo Rol
Skater.belongsTo(Rol, { foreignKey: 'rolId' });


module.exports = Skater;
