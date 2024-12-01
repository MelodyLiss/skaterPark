// models/Rol.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion');

const Rol = sequelize.define('Rol', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'roles',
    timestamps: false
});

module.exports = Rol;

