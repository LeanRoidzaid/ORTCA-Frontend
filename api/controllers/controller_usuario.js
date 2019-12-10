const Sequelize = require('sequelize');

const sequelize  = require('../../config/dbConnection');
var config = require('../../config/config');





exports.ObtenerUsuarioId = async function(id){

    var id, nombre, apellido, dni, mail, UsuarioRet;
    var rolesTemp = [];
    var sql ="SELECT usu.id id, usu.Nombre nombre, usu.Apellido apellido,usu.DNI DNI, usu.usuario usuario,usu.mail mail,ur.idRol idRol ";
        sql+= " FROM db_elaiss.usuarios usu LEFT JOIN db_elaiss.usuario_roles ur ON (usu.id=ur.idUsuario) ";
        sql+= " LEFT JOIN db_elaiss.roles rol ON (ur.idRol=rol.id)WHERE usu.id="+id;
    var autocur = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT});
    for(var usuario of autocur){
        id = usuario.id;
        nombre = usuario.nombre;
        apellido = usuario.apellido;
        dni = usuario.DNI;
        mail = usuario.mail;
        UsuarioRet = usuario.usuario;
        rolesTemp.push(usuario.idRol);


    }

    var usuFormat= {Id: id , Nombre: nombre, Apellido: apellido  , Dni: dni , Mail: mail, Usuario: UsuarioRet, roles: rolesTemp}
    return usuFormat;

}