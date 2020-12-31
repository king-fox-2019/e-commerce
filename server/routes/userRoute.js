const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()

router.post('/register',userController.register)
router.post('/login',userController.login)
router.put('/cart',userController.toCart)
router.get('/cart',userController.getCart)
router.put('/checkout',userController.checkout)

module.exports = router