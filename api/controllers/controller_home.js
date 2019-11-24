const BENEFICIARIOS = require('../models/models_beneficiarios');
const autorizados = require('../models/models_autorizados');
const beneAutoriz = require('../models/models_beneficiario_autorizado');
const Sequelize = require('sequelize');
const ENTREGAS= require('../models/models_entregas');
const ORDENES = require('../models/models_ordenes');
const PRODUCTOS = require('../models/models_productos');
const productosController = require('./controllers_productos');







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




exports.generarEntrega = async function(idEntrega){
    var entrega = await this.obtenerEntregasId(idEntrega);
    ENTREGAS.update({
        estadoEntrega: 'E'},{where:{id:idEntrega} });

        
    var cantidadPedida = entrega.orden[0].cantidad;
    if(cantidadPedida < entrega.orden[0].productoEntrga[0].cantDisp){
        var codbar = await productosController.buscarProducto(entrega.orden[0].productoEntrga[0].codbar);
        await productosController.egreso(codbar.codbar,cantidadPedida);

        console.log("si");
    }else{
        throw Error('Stock Insuficiente');
    }

   
    
    
    

}