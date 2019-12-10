const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { authentication } = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.patch('/cart', authentication, UserController.addToCart)
router.patch('/cart/substract', authentication, UserController.substractFromCart)
router.get('/cart', authentication, UserController.viewCart)
router.delete('/cart', authentication, UserController.removeCart)

module.exports = router