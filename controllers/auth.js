const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body
  try {
    const existeEmail = await Usuario.findOne({ email })
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'Email ja existente'
      })
    }
    const usuario = new Usuario(req.body)

    const salt = bcrypt.genSaltSync()

    usuario.password = bcrypt.hashSync(password, salt)

    await usuario.save()

    // Generar mi jwt

    const token = await generarJWT(usuario.id)
    res.json({
      ok: true,
      usuario,
      token
      // body: req.body
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Fala com administrador'
    })
  }
}

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body

  try {
    const usuarioDb = await Usuario.findOne({ email })
    if (!usuarioDb) {
      return res.status(400).json({
        ok: false,
        msg: 'Email nao encontrado'
      })
    }

    const validPassword = bcrypt.compareSync(password, usuarioDb.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Senha não encontrada'
      })
    }

    const token = await generarJWT(usuarioDb.id)

    return res.json({
      ok: true,
      usuario: usuarioDb,
      token,
      msg: 'Logado com sucesso'
    })
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: 'Fale com administrador'
    })
  }
}

const renewToken = async (req, res = response) => {
  const uid = req.uid

  const token = await generarJWT(uid)

  const usuario = await Usuario.findById(uid)

  res.json({
    ok: true,
    usuario,
    token
  })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  renewToken
}
