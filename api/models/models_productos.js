const Sequelize = require('sequelize')
const sequelize = require('../../config/dbConnection');

const Productos = sequelize.define('producto', {
     id: {type: Sequelize.INTEGER, primaryKey: true},
     codbar: Sequelize.STRING, 
     nombre: Sequelize.STRING,
     nSerie: Sequelize.STRING,
     codOrigen: Sequelize.STRING,
     cantDisp: Sequelize.INTEGER,
     },{timestamps: false,freezeTableName: true
  }); 
module.exports = Productos; 