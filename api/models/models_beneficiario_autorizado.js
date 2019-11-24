const Sequelize = require('sequelize')
const sequelize = require('../../config/dbConnection');
const autorizados = require('./models_autorizados');


const BenefAutorizado = sequelize.define('beneficiario_autorizado', {
     id: {type: Sequelize.INTEGER, primaryKey: true},
     id_beneficiario: Sequelize.INTEGER,  
     id_autorizado: Sequelize.INTEGER,
     },{timestamps: false,freezeTableName: true});

BenefAutorizado.hasMany(autorizados, { foreignKey: 'id' });

module.exports = BenefAutorizado; 