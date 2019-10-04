var express = require('express');
var router = express.Router();


router.post('/login', function(req, res, next) {

  
  res.cookie('token','12345678');
  //res.json({ title: 'Usuarios' , token : 'jwt',usuario:'usuarioes'});
  res.render('index',{ title: 'Usuarios' , token : 'jwt',usuario:'usuarioes'});
});

module.exports = router;
