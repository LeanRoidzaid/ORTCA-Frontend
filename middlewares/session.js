var auth = function(req, res, next) {

        if (req.cookies['jwt'])
          return next();
        else
          //return res.red.sendStatus(401);
          return res.redirect('/login');
      };
      


module.exports=auth;