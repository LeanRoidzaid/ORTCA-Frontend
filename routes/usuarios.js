var express = require('express');
var router = express.Router();
const request = require('request');
var auth = require('../middlewares/session');
var config = require('../config/config');
var controllerUsuario = require("../api/controllers/controller_usuario")



router.post('/login',  async function(req, res, next) {
  //const token='123456';

  await request.post({
                  "headers": { "content-type": "application/json" },
                  "url": config.Protocol + config.URLUsuarios+"/api/login/",
                  "body": JSON.stringify({"usuario": req.body.usuario, "pass": req.body.pass
                })
                    }, 
                      (error, response, body) => 
                      {
                        if(error) {
                          console.dir(error);
                          
                          return res.redirect('/');
                        }else{
                          if(response.statusCode==200)
                          {
                            res.cookie('jwt' ,JSON.parse(body).token);
                            console.log(response);
                            console.dir(JSON.parse(body));
                            return res.redirect('/');
                          }
                          else if(response.statusCode==401){
                            
                            return res.redirect('../../login/?msg=2');

                          }
                          else
                          {
                            return res.redirect('../../login/?msg=3');

                          }
                          console.log(response);
                          
                        }
                        
                      });

                      


  
  //res.json({ title: 'Usuarios' , token : 'jwt',usuario:'usuarioes'});

     //.render('index',{ title: 'Usuarios' , token : token,usuario:'usuarioes'});
});



router.get('/salir', function(req, res,next) {

  res.cookie('jwt' ,'');
  res.redirect('/');


});

function actualizarRolUsuario(msg,jwt){

  
  
 
     request.post({
      "headers": { "content-type": "application/json" },
      "url":  config.Protocol + config.URLUsuarios+"/api/roles/asignarRoles/?token="+jwt,
      "body": JSON.stringify(msg )
      }, (error, response, body) => {
          if(error) {
              return console.dir(error);
          }
          else
          {

            return;
          }

      });




}






router.post('/recuperar', auth,async function(req, res,next) {
  await request.post({
    "headers": { "content-type": "application/json" },
    "url":  config.Protocol + config.URLUsuarios+"/api/usuarios/cambiarPass/?token="+req.cookies['jwt'],
    "body": JSON.stringify( req.body )
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        else
        {
          console.log(body);
          console.log(response);

          res.send(response.body);
        }

    });

});

router.post('/eliminar', auth,async function(req, res,next) {
  await request.post({
    "headers": { "content-type": "application/json" },
    "url":  config.Protocol + config.URLUsuarios+"/api/usuarios/eliminar/?token="+req.cookies['jwt'],
    "body": JSON.stringify( req.body.id )
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        else
        {
          console.log(body);
          console.log(response);

          res.send(response.body);
        }

    });

});
router.post('/actualizar', auth,async function(req, res,next) {

  req.body.pass='ABC!@#';
  req.body.fh_alta=Date.now();
  req.body.idCentro=1;

  var msg = [];

  await request.post({
    "headers": { "content-type": "application/json" },
    "url":  config.Protocol + config.URLUsuarios+"/api/usuarios/actualizar/?token="+req.cookies['jwt'],
    "body": JSON.stringify(req.body )
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        else
        {
          if(req.body.medico=="true")
          {
            msg.push({"idUsuario":req.body.id,"idRol":1});
          }


          if(req.body.administrativo=="true")
          {
            msg.push({"idUsuario":req.body.id,"idRol":2});
         
          }



          if(req.body.auditor=="true")
          {
            msg.push({"idUsuario":req.body.id,"idRol":3});
          }



          if(req.body.administrador=="true")
          {
            msg.push({"idUsuario":req.body.id,"idRol":4});
          }


          actualizarRolUsuario(msg,req.cookies['jwt']) 
  

          res.send(response.body);
        }

    });

});
router.post('/eliminar', auth,function(req, res,next) {

  res.cookie('jwt' ,'');
  request.post({
    "headers": { "content-type": "application/json" },
    "url": config.Protocol + config.URLUsuarios+"/api/login/",
    "body": JSON.stringify({
    "usuario": req.body.usuario,
    "pass": req.body.pass
  })
  }, 
    (error, response, body) => 
    {
      if(error) {
        return console.dir(error);
      }else{
        res.cookie('jwt' ,JSON.parse(body).token);
        console.log(response);
        console.dir(JSON.parse(body));
        res.redirect('/');
      }

    });


});
router.post('/insertar', auth,async function(req, res,next) {

 // res.cookie('jwt' ,'');
  //res.redirect('/');
  req.body.pass='ABC!@#';
   req.body.fh_alta=Date.now();
  req.body.idCentro=1;

  await request.post({
    "headers": { "content-type": "application/json" },
    "url":  config.Protocol + config.URLUsuarios+"/api/usuarios/alta/?token="+req.cookies['jwt'],
    "body": JSON.stringify(req.body )
    }, (error, response, body) => {
        if(error) {
          console.log(error);
          res.send(error);
           
        }
        else
        {
          console.log(response.body);
          res.status(200).send(response.body);
        }

    });



});

router.get('/all',auth,async function(req, res,next) {
  


  await request.get({
    "headers": { "content-type": "application/json" },
    "url":  config.Protocol + config.URLUsuarios+"/api/usuarios/all/?token="+req.cookies['jwt'],
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





router.get('/getUsuario', auth, async function (req, res, next) {



  var usuarios = await controllerUsuario.ObtenerUsuarioId(req.query.idUsuario);

  res.json(usuarios);





});




module.exports = router;
