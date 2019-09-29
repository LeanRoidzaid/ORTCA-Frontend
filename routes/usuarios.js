var express = require('express');
var router = express.Router();


router.post('/login', function(req, res, next) {
  res.render('index', { title: 'Usuarios' , token : 'jwt',usuario:'usuarioes'});
});

module.exports = router;
