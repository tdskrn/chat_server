const mongoose = require('mongoose')
require('dotenv').config()

const dbConnection = async () => {
  try {
    console.log('init db config')
    await mongoose.connect(process.env.DB_CNN)

    console.log('Deu certo')
  } catch (e) {
    console.log(e)
    throw Error('Erro na base de dados')
  }
}

module.exports = {
  dbConnection
}
