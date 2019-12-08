const Sequelize = require('sequelize')
const sequelize = require('../../config/dbConnection');
const Ordenes = require('./models_ordenes');
const Producto = require('./models_productos');

const Entregas = sequelize.define('entregas', {
     id: {type: Sequelize.INTEGER, primaryKey: true},
     idOrden: Sequelize.INTEGER,  
     idProducto: Sequelize.INTEGER,
     cantidad: Sequelize.INTEGER,
     fechaEntrega: Sequelize.DATE,
     fechaRetiro: Sequelize.DATE,
     estadoEntrega: Sequelize.STRING,
     },{timestamps: false,freezeTableName: true
  });

Entregas.belongsTo(Ordenes, { foreignKey: 'idOrden' })
Entregas.belongsTo(Producto, { foreignKey: 'idProducto' })
module.exports = Entregas; 