var express = require('express')
var router = express.Router()
const request = require('request')
var auth = require('../middlewares/session')
var config = require('../config/config')
const Controller = require('../api/controllers/controller_reportes')

/* Reporte de movimiento de productos */
router.get('/demanda', auth, async function(req, res, next) {
    const reportData = await Controller.demanda()

    res.render('Reportes/demanda', {
        reportData,
        title: 'Expresssss',
        token: jwt,
        usuario: res.sessionUser.usuario,
        roles:res.sessionUser.roles.Rol
    })
})

/* Reporte de beneficiarios con ordenes vencidas */
router.get('/vencidas', auth, async function(req, res, next) {
    const reportData = await Controller.vencidas()

    res.render('Reportes/vencidas', {
        reportData,
        title: 'Expreaaass',
        token: jwt,
        usuario: res.sessionUser.usuario,
        roles:res.sessionUser.roles.Rol
    })
})
/** Reporte de beneficiarios que no retiraron */
router.get('/no-retirado', auth, async function(req, res, next) {
    const fecha = req.query.fecha
    const reportData = await Controller.noRetirado(fecha)

    res.render('Reportes/noRetirado', {
        reportData,
        title: 'Exprbbess',
        fecha,
        token: jwt,
        usuario: res.sessionUser.usuario,
        roles:res.sessionUser.roles.Rol
    })
})

module.exports = router