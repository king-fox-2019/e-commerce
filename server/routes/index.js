const router = require('express').Router();
const userRouter = require('./user-router');
const productRouter = require('./product-router')

router.use('/users', userRouter);
router.use('/products', productRouter)

router.get('/', function(req, res, next) {
  res.send('server alive!');
});

module.exports = router;
