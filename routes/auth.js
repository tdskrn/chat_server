/*
'api/login'

*/
const { Router } = require('express')
const { check } = require('express-validator')
const {
  crearUsuario,
  loginUsuario,
  renewToken
} = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.post(
  '/new',
  [
    check('nombre', 'El nombre es obrigatorio').not().isEmpty(),
    check('password', 'El password es obrigatorio').not().isEmpty(),
    check('email', 'El email es obrigatorio').not().isEmpty(),

    validarCampos
  ],
  crearUsuario
)

router.post(
  '/',
  [
    check('password', 'El password es obrigatorio').not().isEmpty(),
    check('email', 'El email es obrigatorio').not().isEmpty()
  ],
  loginUsuario
)

router.get('/renew', validarJWT, renewToken)

module.exports = router
