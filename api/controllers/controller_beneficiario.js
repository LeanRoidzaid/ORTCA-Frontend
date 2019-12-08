const BENEFICIARIOS = require('../models/models_beneficiarios');

const Sequelize = require('sequelize');

const sequelize  = require('../../config/dbConnection');


exports.buscarAutorizados = async function(idbeneficario){
    var sql = "select * from db_elaiss.beneficiario_autorizado ben, db_elaiss.autorizados aut";
    sql+=" where ben.id_autorizado=aut.id";
    sql+=" and ben.id_beneficiario="+idbeneficario;
    
    return await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT});


}