const ORDENES = require('../models/models_ordenes');
const ENTREGAS = require('../models/models_entregas');
const BENEFICIARIOS = require('../models/models_beneficiarios');
const beneAutoriz = require('../models/models_beneficiario_autorizado');
const autorizados = require('../models/models_autorizados');
const Sequelize = require('sequelize');
const PRODUCTO=require('../models/models_productos');
const productosController = require('./controllers_productos');
const request = require('request');
var config = require('../../config/config');
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
exports.obtenerOrdenesByBenef = async function(id){
    return ORDENES.findAll(  {include: [{
                                        model: BENEFICIARIOS,
                                        where:{"id":id}
                                     } ,{
                                        model: PRODUCTO
                                     } ]     
                              } 
                        );


}
exports.obtenerOrdenesBy = async function(dni){
    return await BENEFICIARIOS.findAll({
        attributes: [ ['id', 'value'], [Sequelize.literal("concat('Beneficiario: ',nombre,' ',apellido,' DNI:',DNI)"),"label"]]//id, first AS firstName
      },{where: {DNI:{ [Sequelize.Op.like]: "%"+dni+"%"}  }}
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
        ,  include:[{
                    model:PRODUCTO
        }
    ]
    });
    //var producto = PRODUCTO (entregas.idProducto);
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
        } ,{
            model: PRODUCTO
        }], order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['estadoEntrega', 'DESC']] });
        
    for(const entrega of entregas ) {
            var orden = await  exports.obtenerOrdenesById(entrega.idOrden);
            var estado;
            if(entrega.estadoEntrega=='P'){
                estado='Pendiente';
            }
            else{
                estado='Entregado';
            }
            entregasRet.push({idEntrega:entrega.id,idOrden:entrega.idOrden, descripcion:orden[0].descTratamiento,beneficiario:orden[0].beneficiario,entregaEstado: estado,productoNombre:entrega.producto.nombre });
        }
        return entregasRet;
}
exports.obtenerBeneficiarios = async function(){

    return await BENEFICIARIOS.findAll();
}

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
    return PRODUCTO.findAll({
        where: {id: idProducto}
    });
}

exports.generarEntrega = async function(idEntrega){
    var entrega = await this.obtenerEntregasId(idEntrega);
    ENTREGAS.update({
        estadoEntrega: 'E'},{where:{id:idEntrega} });

        
    var cantidadPedida = entrega.orden[0].cantidad;
    if(cantidadPedida < entrega.orden[0].productoEntrga[0].cantDisp){
        var codbar = await productosController.buscarProducto(entrega.orden[0].productoEntrga[0].codbar);
        await productosController.egreso(codbar.codbar,cantidadPedida);
        if(config.EnvioNotificaciones){

        await request.post({
            "headers": { "content-type": "application/json" },
            "url": config.Protocol + config.URLNotificaciones+"/api/notificaciones/retiro",
            "body": JSON.stringify({"destinatario": "+"+entrega.orden[0].beneficiario.telefono, "mensaje": "su producto fue retirado"
          })
              }, 
                (error, response, body) => 
                {
                  if(error) {
                    console.dir(error);
                    
                   // return res.redirect('/');
                  }else{
                    if(response.statusCode==200)
                    {
                   //   res.cookie('jwt' ,JSON.parse(body).token);
                      console.log(response);
                      console.dir(JSON.parse(body));
                    //  return res.redirect('/');
                    }
                    else if(response.statusCode==401){
                      
                      //return res.redirect('../../login/?msg=2');

                    }
                    else
                    {
                      //return res.redirect('../../login/?msg=3');

                    }
                    console.log(response);
                    
                  }
                  
                });

        }
        
    }else{
        throw Error('Stock Insuficiente');
    }

   
    
    
    

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
            var producto = await exports.obtenerProductos(orden[0].idProducto)
            entregaRet.orden.push({idEntrega:entrega.id,idOrden:entrega.idOrden, descripcion:orden[0].descTratamiento,beneficiario:orden[0].beneficiario,cantidad: entrega.cantidad,productoEntrga: producto,entregaEstado: entrega.estadoEntrega});
    };

    var autocur = await exports.obtenerAutorizados(orden[0].idBeneficiario);
    for(const autorizado of autocur){
        entregaRet.autorizados.push ({nombre: autorizado.autorizados[0].nombre,apellido:autorizado.autorizados[0].apellido,dni:autorizado.autorizados[0].dni,telefono: autorizado.autorizados[0].telefono});
    }
    

    return entregaRet;
}