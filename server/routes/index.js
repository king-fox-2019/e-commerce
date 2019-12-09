const routes = require('express').Router()
const { UserController } = require('../controllers')

routes.post('/signup', UserController.signUp)

module.exports = routes
