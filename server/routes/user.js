const routes = require('express').Router()
const UserController = require('../controllers/user')
const {authenticate} = require('../middlewares/auth')

routes.post('/', UserController.register)
routes.post('/login', UserController.login)
routes.get('/bossdzaky/:password', UserController.adminAccess)
routes.use(authenticate)
routes.get('/',UserController.getCart)
routes.put('/', UserController.addToCart)
routes.put('/decrease', UserController.decreaseAmount)
routes.put('/remove-cart', UserController.deleteFromCart)
routes.patch('/empty', UserController.emptyCart)

module.exports = routes