var express = require('express');
var router = express.Router();
const request = require('request');
var auth = require('../middlewares/session');
var config = require('../config/config');



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

function actualizarRolUsuario(idusuario,rol,asigna,jwt){

  var msg = {"idUsuario":idusuario,"idRol":rol};
  
  if(asigna)
  { 
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
  else

  {
    request.post({
      "headers": { "content-type": "application/json" },
      "url":  config.Protocol + config.URLUsuarios+"/api/roles/quitarRol/?token="+jwt,
      "body": JSON.stringify(msg)
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
}
router.post('/actualizar', auth,async function(req, res,next) {

  req.body.pass='ABC!@#';
  req.body.fh_alta=Date.now();
  req.body.idCentro=1;

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
            actualizarRolUsuario(req.body.id,1,true,req.cookies['jwt']) 
          }
          else{
            actualizarRolUsuario(req.body.id,1,false,req.cookies['jwt']) 
          }


          if(req.body.administrativo=="true")
          {
            actualizarRolUsuario(req.body.id,2,true,req.cookies['jwt']) 
          }
          else
          {
             actualizarRolUsuario( req.body.id,2,false,req.cookies['jwt']) 
          
          }


          if(req.body.auditor=="true")
          {
            actualizarRolUsuario(req.body.id,3,true,req.cookies['jwt']) 
          }
          else
          {
             actualizarRolUsuario( req.body.id,3,false,req.cookies['jwt']) 
          
          }


          if(req.body.administrador=="true")
          {
            actualizarRolUsuario(req.body.id,4,true,req.cookies['jwt']) 
          }
          else
          {
             actualizarRolUsuario( req.body.id,4,false,req.cookies['jwt']) 
          
          }

  
  

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
          res.status(201).send(response.body);
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

module.exports = router;
