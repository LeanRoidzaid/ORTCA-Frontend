var express = require('express');
var router = express.Router();
const request = require('request');
var auth = require('../middlewares/session');
var config = require('../config/config');
var beneficiario = require("../api/controllers/controller_beneficiario");
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
        if(JSON.parse(response.body).error) {
          res.status(401).json(response.body).send();
        }
        else
        {
          

          res.json(response.body).send();
        }

    });



});

router.post('/insertarAutorizado', auth,async function(req, res,next) {

  try{
      await beneficiario.insertarAutorizado(req.body);
    res.json({});
  }catch(error)
  {
    res.stus(401).json({});
  }
  
 
 
 
 });
 


router.post('/actualizar', auth,async function(req, res,next) {

  // res.cookie('jwt' ,'');
   //res.redirect('/');
   req.body.fechaNac=Date.now();
   await request.post({
     "headers": { "content-type": "application/json" },
     "url":  config.Protocol + config.URLBeneficiarios+"/api/beneficiarios/actualizar/?token="+req.cookies['jwt'],
     "body": JSON.stringify(req.body )
     }, (error, response, body) => {
         if(JSON.parse(response.body).error) {
           res.status(401).json(response.body).send();
         }
         else
         {
           
 
           res.json(response.body).send();
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
  


  var autorizados=await beneficiario.buscarAutorizados(req.query.idbeneficiario);
  res.json({autorizados});


});





module.exports = router;
