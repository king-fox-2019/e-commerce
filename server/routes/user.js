const user = require('express').Router()
const { UserController } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

user.use(authenticate)
user.get('/checksession', UserController.checkSession)

module.exports = user
