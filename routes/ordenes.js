var express = require('express');
var router = express.Router();
const request = require('request');
var auth = require('../middlewares/session');
var config = require('../config/config');
var api = require('../api/controllers/controller_ordenes');

router.get('/all',async function(req, res,next) {

    var ordenes = await api.obtenerOrdenes();
    console.log(JSON.stringify(ordenes));
    res.json(ordenes);




});
router.get('/entregasByIdOrden',async function(req, res,next) {

    var entregas = await api.obtenerEntregaByOrden (req.query.idOrden);
    console.log(JSON.stringify(entregas));
    res.json({entregas});




});
router.post('/alta',async function(req, res,next) {
    try{
        var orden = JSON.parse(req.body.Orden);
        orden.idUsuarioMedico=1;
        orden.idCentro=1;
        orden.idUsuarioAlta=1;
        orden.Estado="A";

        
        var entregas =  await api.insertarOrden(orden);
        res.status(200).json({});
    }catch(error){
        res.status(400).json({msg:error.message})
        
    }
    //console.log(JSON.stringify(entregas));
    




});
module.exports = router;
