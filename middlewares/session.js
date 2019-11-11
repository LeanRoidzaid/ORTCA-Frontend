const request = require('request');
const config = require('../config/config');


var auth = function(req, res, next) {
  

        if (req.cookies['jwt']){
        jwt=req.cookies['jwt'];
       
        
        request.get(config.Protocol + config.URLUsuarios+"/api/usuarios/usuarioToken/?token="+jwt, (error, response, body) => {
             if(error) {
                console.dir(error);
                return res.redirect('/login');
           }
           else
           {
            const jsonResponse = JSON.parse(response.body);

                if( response.statusCode ==200)  { 
                  
                  var rol=[];
                  var i =0;
                    jsonResponse.username.usuario_roles.forEach(roles => {
                        rol[i] ={'rol': roles.idRol};
                        i++;

                    });
                  res.sessionUser = {token: jwt,usuario: jsonResponse.username.usuario, roles : Rol = rol }; 
                  next();

                }
                else
                {
                  return res.redirect('/login?msg=1');

                }
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