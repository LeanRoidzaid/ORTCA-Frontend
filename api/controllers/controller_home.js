const BENEFICIARIOS = require('../models/models_beneficiarios');
const autorizados = require('../models/models_autorizados');
const beneAutoriz = require('../models/models_beneficiario_autorizado');
const Sequelize = require('sequelize');
const ENTREGAS= require('../models/models_entregas');
const ORDENES = require('../models/models_ordenes');
const PRODUCTOS = require('../models/models_productos');





exports.obtenerOrdenesById = async function(idOrden){
    return ORDENES.findAll({ where:{ id: idOrden},
        include: [{
            model: BENEFICIARIOS
        } ]      });
}

exports.obtenerAutorizados = async function(idBenef){
    return beneAutoriz.findAll({ where:{ id_beneficiario: idBenef},
        include: [{
            model: autorizados
        } ]      });
}

exports.obtenerProductos = async function (idProducto){
    return PRODUCTOS.findAll({
        where: {id: idProducto}
    });
}




