const router = require('express').Router()
const ControllerCart = require('../controllers/cart')
const authenticate = require('../middlewares/authenticate')
const authorizeCartOwner = require('../middlewares/authorizeCartOwner')

router.get('/all', authenticate, ControllerCart.fetchMany)

router.get('/', authenticate, ControllerCart.fetchOne)

router.post(
  '/products/:productId/:productInputQty',
  authenticate,
  ControllerCart.addOrUpdateQtyInCart
)

router.patch(
  '/products/:productId/:productInputQty',
  authenticate,
  authorizeCartOwner,
  ControllerCart.addOrUpdateQtyInCart
)

router.delete(
  '/products/:productId',
  authenticate,
  authorizeCartOwner,
  ControllerCart.removeProductFromCart
)

router.patch(
  '/:id/checkout',
  authenticate,
  authorizeCartOwner,
  ControllerCart.checkout
)

module.exports = router