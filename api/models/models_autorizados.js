const Sequelize = require('sequelize')
const connection = require('../../config/dbConnection');

const Autorizados = connection.define('autorizados', {
     id: {type: Sequelize.INTEGER, primaryKey: true},
     nombre: Sequelize.STRING,
     apellido: Sequelize.STRING,
     dni: Sequelize.INTEGER,
     telefono: Sequelize.INTEGER,
     fh_alta: Sequelize.DATE,
     fh_baja: Sequelize.DATE, 
     },{timestamps: false
  });
module.exports = Autorizados; 