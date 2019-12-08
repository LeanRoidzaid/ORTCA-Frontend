const BENEFICIARIOS = require('../models/models_beneficiarios');

const Sequelize = require('sequelize');

const sequelize  = require('../../config/dbConnection');


exports.buscarAutorizados = async function(idbeneficario){
    var sql = "select * from db_elaiss.beneficiario_autorizado ben, db_elaiss.autorizados aut";
    sql+=" where ben.id_autorizado=aut.id";
    sql+=" and ben.id_beneficiario="+idbeneficario;
    
    return await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT});


}


exports.insertarAutorizado = async function(autorizado){
    var telefono;
    if(typeof  autorizado.telefono  === 'undefined'){
        telefono='null';

    }
    else{
        telefono="'"+autorizado.telefono+"'";
    }
    var sql = "INSERT INTO db_elaiss.autorizados (nombre, apellido, DNI, telefono, fh_alta) values('"+autorizado.nombre+"','"+autorizado.apellido+"','"+autorizado.dni+"',"+telefono+",CURDATE());";
    var returning =await sequelize.query(sql, { type: Sequelize.QueryTypes.INSERT});
    var sqlAutorizados = "INSERT INTO db_elaiss.beneficiario_autorizado (id_beneficiario, id_autorizado) values("+autorizado.idBeneficiario+","+returning[0]+");";
    var returning =await sequelize.query(sqlAutorizados, { type: Sequelize.QueryTypes.INSERT});
    //return await sequelize.query(sql, { type: Sequelize.QueryTypes.INSERT});
    return returning;

  


}