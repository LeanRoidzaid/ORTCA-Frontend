var express = require('express');
var auth = require('../middlewares/session');

var router = express.Router();
var jwt='asda';

/* GET home page. */
router.get('/',auth,function(req, res, next) {
  jwt=req.cookies['jwt'];
  //jwt='asda';
  //res.cookie('jwt','123456');

  res.render('index', { title: 'Express',token: jwt,usuario:res.sessionUser.usuario,roles:res.sessionUser.roles.Rol});
});


router.get('/login', function(req, res, next) {
  jwt=req.cookies.token;
  
  res.render('login', { title: 'Login' , token : jwt,usuario:'usuarioes',msg:req.query.msg});
});
/*
router.post('/users', function(req, res, next) {
  jwt=req.cookies.token;


  res.json({ title: 'Usuarios' , token : jwt,usuario:'usuarioes'});
  //.render('index', { title: 'Usuarios' , token : 'jwt',usuario:'usuarioes'});
});
*/

router.get('/reportes/demanda',auth,function(req, res, next) {
  
  res.render('Reportes/demanda', { title: 'Express',token: jwt,usuario:res.sessionUser.usuario,roles:res.sessionUser.roles.Rol});
});

router.get('/stock', function(req, res, next) {
  jwt=req.cookies.token;
  res.render('stock', { title: 'Stock' , token : jwt,usuario:'usuarioes'});
});

router.get('/usuarios', auth,function(req, res, next) {
  
  res.render('Usuarios/usuarios', { title: 'Express',token: jwt,usuario:res.sessionUser.usuario,roles:res.sessionUser.roles.Rol});
});


router.get('/beneficiarios', auth,function(req, res, next) {

  res.render('Beneficiarios/beneficiarios', { title: 'Express',token: jwt,usuario:res.sessionUser.usuario,roles:res.sessionUser.roles.Rol});
});

router.get('/ordenes', auth,function(req, res, next) {

  res.render('Ordenes/ordenes', { title: 'Express',token: jwt,usuario:res.sessionUser.usuario,roles:res.sessionUser.roles.Rol});
});




function getUsuarioRoles(cookie)
{
  
}; 



module.exports = router;
