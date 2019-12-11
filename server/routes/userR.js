`use strict`

const express = require('express')
const router = express.Router()
const ControllerUser = require('../controllers/userC')
const { authenticating } = require('../middlewares/auth')


router.get('/', ControllerUser.findAllUser)

router.post('/login', ControllerUser.login)

router.post('/register', ControllerUser.register)

router.get('/cart', authenticating, ControllerUser.showCart)

// router.get('/product', authenticating, ControllerUser.showProduct)


module.exports = router