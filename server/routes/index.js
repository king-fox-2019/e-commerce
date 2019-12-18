const router = require('express').Router();
const userRouter = require('./user-router');
const productRouter = require('./product-router')
const cartRouter = require('./cart-router')

router.use('/users', userRouter);
router.use('/products', productRouter)
router.use('/cart', cartRouter)

router.get('/', function(req, res, next) {
  res.send('server alive!');
});

module.exports = router;
