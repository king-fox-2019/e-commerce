const router = require('express').Router();
const CartController = require('../controllers/cart');
const authenticate = require('../middlewares/authenticate');

router.get('/', authenticate, CartController.fetchCart);
router.post('/', authenticate, CartController.addToCart);
router.put('/', authenticate, CartController.removeFromCart);

module.exports = router;