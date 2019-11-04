const request = require('request');



var auth = function(req, res, next) {

        if (req.cookies['jwt']){
        jwt=req.cookies['jwt'];
        
        
        request.get("http://localhost:3001/api/usuarios/usuarioToken/?token="+jwt, (error, response, body) => {
            if(error) {
                //return 
                console.dir(error);
           }
           else{
            const jsonResponse = JSON.parse(response.body);
            res.sessionUser = {token: jwt,usuario: jsonResponse.username.usuario, roles : Rol = [{rol:1},{rol:2},{rol:3}] };
            next();
           }
            //console.dir(JSON.parse(response.body.username));
        });
          //return 
        
        }else{
          //return res.red.sendStatus(401);
          return res.redirect('/login');
        }
        
      };
      


module.exports=auth;