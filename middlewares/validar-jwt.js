const jwt = require('jsonwebtoken')

const validarJWT = async (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Não tem token na requisição'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY)
    req.uid = uid

    next()
  } catch (err) {
    return res.status(401).json({
      ok: false,
      msg: 'Token invalido'
    })
  }
}

module.exports = {
  validarJWT
}
