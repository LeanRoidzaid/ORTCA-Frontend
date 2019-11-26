var express = require('express');
var auth = require('../middlewares/session');
var ordenes = require('../api/controllers/controller_ordenes');
var productos = require('../api/controllers/controllers_productos');
var router = express.Router();
var jwt='asda';

/* GET home page. */
router.get('/',auth, async function(req, res, next) {
  jwt=req.cookies['jwt'];
  var retiros = await ordenes.obtenerEntregasDia();
  
  console.log( JSON.stringify(retiros));
  res.render('index', { title: 'Express',token: jwt,usuario:res.sessionUser.usuario,roles:res.sessionUser.roles.Rol, retiroDia: retiros});
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

router.get('/ordenes', auth,async function(req, res, next) {
  var productoList = await productos.obtenerProductos();
  var beneficiariosList = await ordenes.obtenerBeneficiarios();

  res.render('Ordenes/ordenes', { title: 'Express',token: jwt,usuario:res.sessionUser.usuario,roles:res.sessionUser.roles.Rol, productos:productoList,beneficiarios: beneficiariosList});
});




function getUsuarioRoles(cookie)
{
  
}; 



module.exports = router;
