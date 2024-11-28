const { DataTypes } = require('sequelize');
const sequelize =require('../database/conexion');
const Rol = require('./roles')

const Usuario = sequelize.define('Usuario', {
    id:{ 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    email:{ 
        type: DataTypes.STRING(50), 
        allowNull: false, 
        unique: true 
    },
    password:{ 
        type: DataTypes.STRING(255), 
        allowNull: false }
},{
    tableName:'usuarios',
    timestamps:false
});


Usuario.belongsTo(Rol, {
    foreignKey: 'rolId' 
});

module.exports = Usuario;