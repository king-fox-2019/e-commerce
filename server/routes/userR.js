`use strict`

const express = require('express')
const router = express.Router()
const ControllerUser = require('../controllers/userC')
const { authenticating, authorizating } = require('../middlewares/auth')

console.log('masuk routes');
router.get('/', ControllerUser.findAllUser)

router.post('/login', ControllerUser.login)

router.post('/register', ControllerUser.register)

router.use(authenticating)

router.get('/cart', ControllerUser.showCart)

router.patch('/:id', ControllerUser.addCart)

router.put('/:id', ControllerUser.removeCart)


module.exports = router