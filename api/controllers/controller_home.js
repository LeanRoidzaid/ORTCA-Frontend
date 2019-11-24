const BENEFICIARIOS = require('../models/models_beneficiarios');
const autorizados = require('../models/models_autorizados');
const beneAutoriz = require('../models/models_beneficiario_autorizado');
const Sequelize = require('sequelize');
const ENTREGAS= require('../models/models_entregas');
const ORDENES = require('../models/models_ordenes');

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


exports.obtenerEntregasId= async function(idEntrega){
    const Op = Sequelize.Op;
    var entregaRet={};
    entregaRet.orden = [];
    entregaRet.autorizados = [];
    
    var orden;
    var entregas = await ENTREGAS.findAll({where: {
        id: idEntrega  
        },
        include: [{
            model: ORDENES
        } ] });
        
    for(const entrega of entregas ) {
            var orden = await  exports.obtenerOrdenesById(entrega.idOrden);
            entregaRet.orden.push({idEntrega:entrega.id,idOrden:entrega.idOrden, descripcion:orden[0].descTratamiento,beneficiario:orden[0].beneficiario});
    };

    var autocur = await exports.obtenerAutorizados(orden[0].idBeneficiario);
    for(const autorizado of autocur){
        entregaRet.autorizados.push = {nombre: autorizado.nombre,apellido:autorizado.apellido,dni:autorizado.dni,telefono: autorizado.telefono};
    }
    

    return entregaRet;
}