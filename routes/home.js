var express = require('express');
var home = require('../api/controllers/controller_home');

var router = express.Router();

router.get('/autorizadosById', async function(req, res, next) {

    var response = await home.obtenerEntregasId(req.query.id);
    res.send(response);
    

});





router.get('/Entregar', async function(req, res, next) {

    try{
        var response = await home.generarEntrega(req.query.id);
        
        return res.send(response);
    }catch(error){
        return res.status(201).send({err:error.message});
    }
    

});
module.exports = router;