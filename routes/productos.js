var express = require('express');
var auth = require('../middlewares/session');
var ordenes = require('../api/controllers/controller_ordenes');
var productos = require('../api/controllers/controllers_productos');
var router = express.Router();


router.get('/',auth, async function(req, res, next) {
    jwt=req.cookies['jwt'];
    
    var productosList = await productos.obtenerProductos();
    
   
    res.render('Productos/productos', { title: 'Express',token: jwt,usuario:res.sessionUser.usuario,roles:res.sessionUser.roles.Rol, productosStock: productosList});
  });
  


  router.post('/generarMovimiento', auth,async function(req, res,next) {

    try{
      await productos.egreso(req.body.idproducto, parseInt(req.body.cantidad, 10));
      res.json({});
    }catch(error)
    {
      res.status(401).json({error:"No se pudo generar el movimiento. "+error.message});
    }
    
   
   
   
   });



   
module.exports = router;