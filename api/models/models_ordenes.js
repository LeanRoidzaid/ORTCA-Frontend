const Sequelize = require('sequelize')
const sequelize = require('../../config/dbConnection');
const beneficiario = require('./models_beneficiarios');

const Ordenes = sequelize.define('orden', {
     id: {type: Sequelize.INTEGER, primaryKey: true},
     idUsuarioMedico: Sequelize.INTEGER,  
     idCentro: Sequelize.INTEGER,
     idBeneficiario: Sequelize.INTEGER,
     idUsuarioAlta: Sequelize.INTEGER,
     idProducto: Sequelize.INTEGER,
     fechaInicio: Sequelize.DATE,
     fechaFin: Sequelize.DATE,
     descTratamiento: Sequelize.STRING,
     observaciones: Sequelize.STRING,
     estado: Sequelize.STRING,
     tipo: Sequelize.STRING,
     },{timestamps: false,freezeTableName: true
  });


Ordenes.hasOne(beneficiario, { foreignKey: 'id' })
module.exports = Ordenes; 