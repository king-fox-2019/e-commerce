const router = require('express').Router()
const { authenticate, authorizationCustomer } = require('../middlewares/auth')
const CartController = require('../controllers/cart')

// create cart
router.post('/', authenticate, authorizationCustomer, CartController.createCart)

// increment amount at cart
router.put('/:id/add', authenticate, authorizationCustomer, CartController.addAmount)

// decrement amount at cart
router.put('/:id/min', authenticate, authorizationCustomer, CartController.minAmount)

// delete product
router.delete('/:id', authenticate, authorizationCustomer, CartController.deleteProduct)

// delete cart
router.delete('/', authenticate, authorizationCustomer, CartController.deleteCart)

// get all product in cart
router.get('/', authenticate, authorizationCustomer, CartController.getAllProduct)

module.exports = router