const routes = require('express').Router()
const { UserController } = require('../controllers')

routes.post('/signup', UserController.signUp)
routes.post('/signin', UserController.signIn)

module.exports = routes
