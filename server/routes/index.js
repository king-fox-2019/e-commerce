const routes = require('express').Router()
const { UserController } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

routes.post('/signup', UserController.signUp)
routes.post('/signin', UserController.signIn)
routes.use('/admin', require('./admin'))

routes.use(authenticate)

routes.use('/user', require('./user'))
routes.use('/items', require('./items'))
routes.use('/transactions', require('./transactions'))

module.exports = routes
