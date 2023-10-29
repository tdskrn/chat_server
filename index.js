const express = require('express')
const path = require('path')

// Db Config
const { dbConnection } = require('./database/config')
dbConnection()
require('dotenv').config()

// App de Express
const app = express()

// Read and Parse body

app.use(express.json())

// Node Server
const server = require('http').createServer(app)
module.exports.io = require('socket.io')(server)
require('./sockets/socket')

// Path publico

const publicPath = path.resolve(__dirname, 'public')

app.use(express.static(publicPath))

// Rotas
app.use('/api/login', require('./routes/auth'))

server.listen(process.env.PORT, err => {
  if (err) throw new Error(err)
  console.log(`Servidor logado em porta`, process.env.PORT)
})
