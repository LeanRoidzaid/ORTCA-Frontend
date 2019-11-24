const Sequelize = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(config.DB.name, config.DB.user, config.DB.password, {
  host: config.DB.host,
  dialect: 'mysql',
  port: config.DB.port,
  logging: console.log
})


sequelize.authenticate()
  .then(() => {
    console.log('[DB] Conectado')
  })
  .catch(err => {
    console.log('[DB] No se conecto')
  })

module.exports = sequelize;