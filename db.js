const Sequelize = require('sequelize')

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:LetMeIn@localhost:5432/postgres'
const sequelize = new Sequelize(connectionString, {define: { timestamps: false }})

sequelize.sync()
  .then(() => {
    console.log('Sequelize DID COOL UPDATES TO DB')
  })
  .catch(console.error)

module.exports = sequelize
