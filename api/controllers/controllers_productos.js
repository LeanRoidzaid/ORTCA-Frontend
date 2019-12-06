const PRODUCTOS = require('../models/models_productos');
const MOVIMIENTOS = require('../models/models_movimientos');
const Sequelize = require('sequelize');
exports.insertarProducto = function(producto){
    return PRODUCTOS.create({
        id: producto.id,
        codbar: producto.codbar, 
        nombre: producto.GTIN,
        nSerie: producto.nSerie,
        codOrigen: producto.codOrigen,
        cantDisp: producto.cantDisp
       })
}

exports.insertarMovimiento = function(movimiento){
    return MOVIMIENTOS.create({
        idProducto: movimiento.idProducto, 
        tipoMov: movimiento.tipoMov,
        cantUnidades: movimiento.cantUnidades,
        idUsuario: movimiento.idUsuario,
       })
}

exports.egreso = async function(codbar,cantidad){

    let producto = await this.buscarProducto(codbar);
    producto.cantDisp = producto.cantDisp - cantidad;
    
    result = await this.updateDisponible(producto)
 
    if (cantidad < 0){
        tipo = "egreso"
    }else{
        tipo = "ingreso"
    }


    const movimiento = { idProducto: producto.id, 
                         tipoMov: tipo,
                         cantUnidades: cantidad,
                         idUsuario: 1}

    return this.insertarMovimiento(movimiento)

}

exports.updateDisponible = async function(producto){
    
    return PRODUCTOS.update({
        cantDisp: producto.cantDisp},
        {where: {codbar:producto.codbar}}
        )
}

exports.buscarProducto = async function(codbar){
    return PRODUCTOS.findOne({
        where: {codbar: codbar}}

    )
}
exports.obtenerProductos = async function(){
    return await PRODUCTOS.findAll();
}