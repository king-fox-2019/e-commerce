const router = require('express').Router(),
  userRoutes = require('./user'),
  productRoutes = require('./product')

router.use('/user', userRoutes)
router.use('/products', productRoutes)

module.exports = router