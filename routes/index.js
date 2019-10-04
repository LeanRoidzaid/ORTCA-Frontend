var express = require('express');

var router = express.Router();
var jwt='asda';

/* GET home page. */
router.get('/',function(req, res, next) {
  jwt=req.cookies.token;
  jwt='asda';

  res.render('index', { title: 'Express' ,token: jwt,usuario: 'usuas'});
});


router.get('/login', function(req, res, next) {
  jwt=req.cookies.token;
  res.render('login', { title: 'Login' , token : jwt,usuario:'usuarioes'});
});

router.post('/users', function(req, res, next) {
  jwt=req.cookies.token;


  res.json({ title: 'Usuarios' , token : jwt,usuario:'usuarioes'});
  //.render('index', { title: 'Usuarios' , token : 'jwt',usuario:'usuarioes'});
});


router.get('/reportes', function(req, res, next) {
  jwt=req.cookies.token;
  res.render('reportes', { title: 'Reportes' , token : jwt,usuario:'usuarioes'});
});

router.get('/stock', function(req, res, next) {
  jwt=req.cookies.token;
  res.render('stock', { title: 'Stock' , token : jwt,usuario:'usuarioes'});
});

router.get('/usuarios', function(req, res, next) {
  jwt=req.cookies.token;
  res.render('usuarios', { title: 'Usuarios' , token : jwt,usuario:'usuarioes'});
});


router.get('/beneficiarios', function(req, res, next) {
  jwt=req.cookies.token;
  console.log("beneficiaro");
  res.render('beneficiarios', { title: 'Beneficiarios' , token : jwt,usuario:'usuarioes'});
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




function getUsuarioRoles(cookie)
{
  
}; 



module.exports = router;
