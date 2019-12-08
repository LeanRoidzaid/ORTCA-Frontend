const moment = require('moment')
const Ordenes = require('./controller_ordenes')
const EntregasModel = require('../models/models_entregas')
const connection = require('../../config/dbConnection')

exports.demanda = async () => {
    const query = "SELECT SUM(e.idProducto) as cantidad, p.nombre FROM entregas e INNER JOIN producto p on p.id = e.idproducto GROUP BY e.idProducto"
    const data = await connection.query(query).then(data => {
        if (Array.isArray(data) && data.length > 0) {
            return data[0]
        } else {
            return []
        }
    })

    const labels = data.map(d => d.nombre)
    const report = {}
    if (Array.isArray(labels) && labels.length > 0) {
        for (const element of data) {
            console.log(element)
            report[element.nombre] = element.cantidad
        }
    }

    return { labels, report }
}

exports.vencidas = async () => {
    const query = `
        SELECT b.nombre as nombre, b.apellido as apellido, b.telefono as telefono FROM beneficiarios b WHERE id NOT IN (
            SELECT b.id
            FROM beneficiarios b
            INNER JOIN orden o on o.idBeneficiario = b.id
            WHERE o.fechaFin >= now()
            GROUP BY b.id
        )
    `

    return connection.query(query).then(data => (Array.isArray(data) && data.length > 0) ? data[0] : []).then(items => items.map(i => {
        return {
            nombre: i.nombre,
            apellido: i.apellido,
            telefono: i.telefono
        }
    }))
}

exports.retiradosVsNoRetirados = async (day) => {
    if (!day) {
        day = moment().format('YYYY-MM-DD')
    }

    const from = moment(day).set({ hour: 0 }).subtract(1, 'm')
    const to = moment(day).set({ hour: 0 }).add(1, 'd')

    const query = `
        SELECT SUM(e.id) as cantidad, e.estadoEntrega
        FROM entregas e
        WHERE e.fechaEntrega > '${from.format()}' and e.fechaEntrega < '${to.format()}'
        GROUP BY e.estadoEntrega
    `
    
    return connection.query(query).then(data => (Array.isArray(data) && data.length > 0) ? data[0] : []).then(items => items.map(i => {
        const estado = i.estadoEntrega === 'E' ? 'Entregado' : 'Pendiente'

        return {
            cantidad: i.cantidad,
            estado
        }
    }))
}

exports.noRetirado = async (day) => {
    if (!day) {
        day = moment().format('YYYY-MM-DD')
    }

    const from = moment(day).set({ hour: 0 }).subtract(1, 'm')
    const to = moment(day).set({ hour: 0 }).add(1, 'd')

    const query = `
        SELECT b.nombre as nombre, b.apellido as apellido, b.telefono as telefono, e.fechaEntrega as fecha, p.nombre as productoNombre
        FROM entregas e
        INNER JOIN orden o on e.idOrden = o.id
        INNER JOIN beneficiarios b on b.id = o.idBeneficiario
        INNER JOIN producto p on p.id = e.idproducto
        WHERE e.estadoEntrega = 'P' AND e.fechaEntrega > '${from.format()}' and e.fechaEntrega < '${to.format()}'
    `
    
    const noRetirado = await connection.query(query).then(data => (Array.isArray(data) && data.length > 0) ? data[0] : []).then(items => items.map(i => {
        return {
            nombre: i.nombre,
            apellido: i.apellido,
            telefono: i.telefono,
            fecha: i.fecha,
            producto: i.productoNombre
        }
    }))

    return noRetirado
}
