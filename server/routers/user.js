const router = require('express').Router();
const controllerUser = require('../controller/User');
const checkToken = require('../middleware/checkToken');

router.post('/register', controllerUser.reqisterUser);
router.post('/login', controllerUser.loginUser);

router.use(checkToken);

router.get('/verify', controllerUser.findUserid);
router.patch('/cart', controllerUser.addToCart);
router.delete('/cart/:id', controllerUser.deleteCartItem);
router.get('/', controllerUser.viewUser);

module.exports = router;