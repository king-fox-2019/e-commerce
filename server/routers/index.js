const router = require('express').Router()


router.use('/users', require('./userRouter'))
router.use('/products', require('./productRouter'))
router.use('/carts', require('./cartRouter'))


module.exports = router