const user = require('express').Router()
const { UserController } = require('../controllers')

user.get('/checksession', UserController.checkSession)

module.exports = user
