var express = require('express');
var router = express.Router();


router.post('/login', function(req, res, next) {
  const token='123456';
  res.cookie('jwt',token);


  
  //res.json({ title: 'Usuarios' , token : 'jwt',usuario:'usuarioes'});
  res.redirect('/');
     //.render('index',{ title: 'Usuarios' , token : token,usuario:'usuarioes'});
});

module.exports = router;
