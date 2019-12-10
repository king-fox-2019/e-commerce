const router = require('express').Router()
const ControllerCart = require('../controllers/cart')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

router.get('/', authenticate, ControllerCart.fetchOne)

router.post(
  '/products/:id/:qty',
  authenticate,
  ControllerCart.addOrUpdateQtyInCart
)

router.patch(
  '/products/:id/:qty',
  authenticate,
  authorize,
  ControllerCart.updateProductQtyInCart
)

router.get(
  '/:id/checkout',
  authenticate,
  authorize,
  ControllerCart.checkout
)

module.exports = router