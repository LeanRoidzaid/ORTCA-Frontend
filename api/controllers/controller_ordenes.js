const ORDENES = require('../models/models_ordenes');
const ENTREGAS = require('../models/models_entregas');
const BENEFICIARIOS = require('../models/models_beneficiarios');
const Sequelize = require('sequelize');
exports.insertarOrden = function(orden){
    return ORDENES.create({
        id: orden.id,
        idUsuarioMedico: orden.idUsuarioMedico,  
        idCentro: orden.idCentro,
        idBeneficiario: orden.idBeneficiario,
        idUsuarioAlta: orden.idUsuarioAlta,
        idProducto: orden.idProducto,
        fechaInicio: orden.fechaInicio,
        fechaFin: orden.fechaFin,
        descTratamiento: orden.descTratamiento,
        observaciones: orden.observaciones,
        estado: orden.estado,
        tipo: orden.tipo,
       })
}


exports.obtenerOrdenesById = async function(idOrden){
    return ORDENES.findAll({ where:{ id: idOrden},
        include: [{
            model: BENEFICIARIOS
        } ]      });
}



exports.insertarEntregas = function(entregas){
    return ENTREGAS.create({
        id: entregas.id,
        idOrden: entregas.idOrden,  
        idProducto: entregas.idProducto,
        fechaEntrega: entregas.fechaEntrega,
        fechaRetiro: entregas.fechaRetiro,
        estadoEntrega: entregas.estadoEntrega,
       })
}



exports.obtenerEntregasDia = async function(){
    const Op = Sequelize.Op;
    var entregasRet=[];
    var orden;
    var entregas = await ENTREGAS.findAll({where: {
        fechaRetiro: {
            [Op.lt]: new Date(new Date() + 24 * 60 * 60 * 1000),
            [Op.gt]: new Date(new Date() - 48 * 60 * 60 * 1000)
          }
        },
        include: [{
            model: ORDENES
        } ] });
        
    for(const entrega of entregas ) {
            var orden = await  exports.obtenerOrdenesById(entrega.idOrden);
            var estado;
            if(entrega.estadoEntrega=='P'){
                estado='Pendiente';
            }
            else{
                estado='Entregado';
            }
            entregasRet.push({idEntrega:entrega.id,idOrden:entrega.idOrden, descripcion:orden[0].descTratamiento,beneficiario:orden[0].beneficiario,entregaEstado: estado});
        }
        return entregasRet;
}


