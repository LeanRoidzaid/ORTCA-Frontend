var express = require('express');
var router = express.Router();
const request = require('request');
var auth = require('../middlewares/session');



router.post('/login', async function(req, res, next) {
  //const token='123456';

  await request.post({
    "headers": { "content-type": "application/json" },
    "url": "http://localhost:3001/api/login/",
    "body": JSON.stringify({
        "usuario": req.body.usuario,
        "pass": req.body.pass
    })
}, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    else
    {
      res.cookie('jwt' ,JSON.parse(body).token);
      console.log(response);
      console.dir(JSON.parse(body));
      res.redirect('/');
    }

});

  


  
  //res.json({ title: 'Usuarios' , token : 'jwt',usuario:'usuarioes'});

     //.render('index',{ title: 'Usuarios' , token : token,usuario:'usuarioes'});
});



router.get('/salir', function(req, res,next) {

  res.cookie('jwt' ,'');
  res.redirect('/');


});


router.post('/actualizar', auth,function(req, res,next) {

  res.cookie('jwt' ,'');
  res.redirect('/');


});



router.get('/all',auth,async function(req, res,next) {
  


  await request.get({
    "headers": { "content-type": "application/json" },
    "url": "http://localhost:3001/api/usuarios/all/?token="+req.cookies['jwt'],
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
