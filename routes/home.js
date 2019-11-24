var express = require('express');
var home = require('../api/controllers/controller_home');





var router = express.Router();

router.get('/autorizadosById', async function(req, res, next) {

    var response = await home.obtenerEntregasId(req.query.id);
    res.send(response);
    

});

module.exports = router;