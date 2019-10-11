var express = require('express');
var router = express.Router();

var token;
router.post('/login', function(req, res, next) {

  token = req.cookies['token'];
  
  //res.json({ title: 'Usuarios' , token : 'jwt',usuario:'usuarioes'});
  res.render('index',{ title: 'Usuarios' , token : token,usuario:'usuarioes'});
});

module.exports = router;
