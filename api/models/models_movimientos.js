const Sequelize = require('sequelize')
const sequelize = require('../../config/dbConnection');

const Movimimentos = sequelize.define('movimiento', {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    idProducto: Sequelize.INTEGER, 
    tipoMov: Sequelize.STRING,
    cantUnidades: Sequelize.INTEGER,
    idUsuario: Sequelize.INTEGER,
    },{timestamps: false,freezeTableName: true
 });
module.exports = Movimimentos; 