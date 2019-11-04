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
  res.render('login', { title: 'Login' , token : jwt,usuario:'usuarioes'});
});
/*
router.post('/users', function(req, res, next) {
  jwt=req.cookies.token;


  res.json({ title: 'Usuarios' , token : jwt,usuario:'usuarioes'});
  //.render('index', { title: 'Usuarios' , token : 'jwt',usuario:'usuarioes'});
});
*/

router.get('/reportes', function(req, res, next) {
  jwt=req.cookies.token;
  res.render('reportes', { title: 'Reportes' , token : jwt,usuario:'usuarioes'});
});

router.get('/stock', function(req, res, next) {
  jwt=req.cookies.token;
  res.render('stock', { title: 'Stock' , token : jwt,usuario:'usuarioes'});
});

router.get('/usuarios', auth,function(req, res, next) {
  
  res.render('Usuarios/usuarios', { title: 'Express',token: jwt,usuario:res.sessionUser.usuario,roles:res.sessionUser.roles.Rol});
});


router.get('/beneficiarios', function(req, res, next) {
  jwt=req.cookies.token;
  console.log("beneficiaro");
  res.render('beneficiarios', { title: 'Beneficiarios' , token : jwt,usuario:'usuarioes'});
});

// middleware function to check for logged-in users





function getUsuarioRoles(cookie)
{
  
}; 



module.exports = router;
