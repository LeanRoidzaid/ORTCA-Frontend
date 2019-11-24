const Sequelize = require('sequelize')
const connection = require('../../config/dbConnection');

const Beneficiarios = connection.define('beneficiarios', {
     id: {type: Sequelize.INTEGER, primaryKey: true},
     nombre: Sequelize.STRING,
     apellido: Sequelize.STRING,
     dni: Sequelize.INTEGER,
     fechaNac: Sequelize.DATE,
     telefono: Sequelize.INTEGER,
     data_created: Sequelize.DATE,
     fh_baja: Sequelize.DATE, 
     },{timestamps: false
  });
module.exports = Beneficiarios; 