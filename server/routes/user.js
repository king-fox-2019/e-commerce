const router = require('express').Router(),
  UserController = require('../controllers/user'),
  { authenticate } = require('../middlewares/auth')

router.get('/', UserController.all)
router.post('/register', UserController.create)
router.post('/login', UserController.login)
router.get('/cart', authenticate, UserController.one)
router.patch('/cart', authenticate, UserController.addToCart)
router.delete('/cart/:id', authenticate, UserController.removeCart)

module.exports = router