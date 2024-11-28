const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:hola123@localhost:5432/skaterProyect')

module.exports = sequelize;
