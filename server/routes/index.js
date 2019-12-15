const router = require('express').Router();
const UserController = require('../controllers/user');
const ProductRouter = require('./products')
const CartRouter = require('./carts')
const TransactionRouter = require('./transactions')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use('/products', ProductRouter)
router.use('/carts', CartRouter)
router.use('/transactions', TransactionRouter)

module.exports = router;