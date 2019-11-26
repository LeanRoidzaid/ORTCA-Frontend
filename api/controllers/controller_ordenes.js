const ORDENES = require('../models/models_ordenes');
const ENTREGAS = require('../models/models_entregas');
const BENEFICIARIOS = require('../models/models_beneficiarios');
const Sequelize = require('sequelize');
const PRODUCTO=require('../models/models_productos');
exports.insertarOrden = async function(orden){

    return  ORDENES.create({
        idUsuarioMedico: orden.idUsuarioMedico,  
        idCentro: orden.idCentro,
        idBeneficiario: orden.idBeneficiario,
        idUsuarioAlta: orden.idUsuarioAlta,
        idProducto: orden.idProducto,
        fechaInicio: orden.fechaInicio,
        fechaFin: orden.fechaFin,
        descTratamiento: orden.descTratamiento,
        observaciones: orden.observaciones,
        estado: orden.Estado,
        tipo: orden.tipo
       }).then(result=>{
           console.log("result :"+result.id);

           for(var i=0; i<orden.fechasEntregas.length;i++){
               var fecha = orden.fechasEntregas[i].split('-');
               var entrega = {idOrden:result.id,idProducto:orden.idProducto,fechaEntrega:new Date(fecha[0],fecha[1]-1,fecha[2]),estadoEntrega:'P',cantidad:orden.cantidadEntregas[i]};
               this.insertarEntregas(entrega);

           }
       })
}


exports.obtenerOrdenesById = async function(idOrden){
    return ORDENES.findAll({ where:{ id: idOrden},
        include: [{
            model: BENEFICIARIOS
        } ]      });
}
exports.obtenerOrdenes = async function(){
    return ORDENES.findAll(     {include: [{
                                        model: BENEFICIARIOS
                                     } ,{
                                        model: PRODUCTO
                                     } ]      
                                }, 
                        );
}


exports.insertarEntregas = function(entregas){
    return ENTREGAS.create({
        idOrden: entregas.idOrden,  
        idProducto: entregas.idProducto,
        fechaEntrega: entregas.fechaEntrega,
        estadoEntrega: entregas.estadoEntrega,
        cantidad: entregas.cantidad,
       })
}


exports.obtenerEntregaByOrden = async function(ordenId){
    var entregas = await ENTREGAS.findAll({
        where: {
            idOrden: ordenId
        }
        //,  include:[{
          //          model:PRODUCTO
       // }
   // ]
    });
    return entregas;
}
exports.obtenerEntregasDia = async function(){
    const Op = Sequelize.Op;
    var entregasRet=[];
    var orden;
    var entregas = await ENTREGAS.findAll({where: {
        fechaEntrega: {
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
exports.obtenerBeneficiarios = async function(){

    return await BENEFICIARIOS.findAll();
}


