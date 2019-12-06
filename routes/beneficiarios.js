var express = require('express');
var router = express.Router();
const request = require('request');
var auth = require('../middlewares/session');
var config = require('../config/config');

var ordenes = require("../api/controllers/controller_ordenes")


router.post('/insertar', auth,async function(req, res,next) {

 // res.cookie('jwt' ,'');
  //res.redirect('/');
  req.body.fechaNac=Date.now();
  await request.post({
    "headers": { "content-type": "application/json" },
    "url":  config.Protocol + config.URLBeneficiarios+"/api/beneficiarios/alta/?token="+req.cookies['jwt'],
    "body": JSON.stringify(req.body )
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        else
        {

          res.send(response.body);
        }

    });



});

router.get('/all',auth,async function(req, res,next) {
  


  await request.get({
    "headers": { "content-type": "application/json" },
    "url":  config.Protocol + config.URLBeneficiarios+"/api/beneficiarios/all/?token="+req.cookies['jwt'],
    "body": JSON.stringify({ })
}, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    else
    {

      res.send(response.body);
    }

});






});






router.get('/autorizadosById',auth,async function(req, res,next) {
  

  var response = await ordenes.obtenerAutorizados(req.query.id);
  res.send(response);
  




});





module.exports = router;
