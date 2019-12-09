var express = require('express');
var home = require('../api/controllers/controller_home');
var ordenes = require("../api/controllers/controller_ordenes")


var router = express.Router();

router.get('/autorizadosById', async function(req, res, next) {

 
try{
    var response = await ordenes.obtenerEntregasId(req.query.id);
    res.send(response);
}catch(err){
    next(err);
}
    
    
    
    

});





router.get('/Entregar', async function(req, res, next) {

    try{
        var response = await ordenes.generarEntrega(req.query.id);
        
        return res.send(response);
    }catch(error){
        return res.status(400).send({err:error.message});
    }
    

});
module.exports = router;