const router = require('express').Router()
const UserController = require('../controllers/user')
const { authentication } = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/all', UserController.findAll)
router.patch('/cart', authentication, UserController.addToCart)
router.patch('/cart/subtract', authentication, UserController.subtractFromCart)
router.patch('/cart/:id', authentication, UserController.removeFromCart)
router.get('/cart', authentication, UserController.viewCart)
// router.post('/googleLogin', UserController.googleLogin)

module.exports = router