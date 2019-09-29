var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next) {
  res.render('index', { title: 'Express' ,usuario: 'usuas'});
});


router.get('/login', function(req, res, next) {
  res.locals.nombre="pedro";
  res.render('login', { title: 'Login' , token : 'jwt',usuario:'usuarioes'});
});

router.post('/users', function(req, res, next) {
  res.json({ title: 'Usuarios' , token : 'jwt',usuario:'usuarioes'});
  //.render('index', { title: 'Usuarios' , token : 'jwt',usuario:'usuarioes'});
});


router.get('/reportes', function(req, res, next) {
  res.render('reportes', { title: 'Reportes' , token : 'jwt',usuario:'usuarioes'});
});

router.get('/stock', function(req, res, next) {
 
  res.render('stock', { title: 'Stock' , token : 'jwt',usuario:'usuarioes'});
});

router.get('/usuarios', function(req, res, next) {

  res.render('usuarios', { title: 'Usuarios' , token : 'jwt',usuario:'usuarioes'});
});


router.get('/beneficiarios', function(req, res, next) {
  res.locals.nombre="pedro";
  res.render('beneficiarios', { title: 'Beneficiarios' , token : 'jwt',usuario:'usuarioes'});
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  //if (req.session.user && req.cookies.user_sid) {
  if (req.session.user ) {
      res.redirect('/dashboard');
  } else {
      next();
  }    
};

module.exports = router;
