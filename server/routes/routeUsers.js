const router = require('express').Router()
const ControllerUser = require('../controllers/user')
const authenticate = require('../middlewares/authenticate')

router.post('/register', ControllerUser.register)

router.post('/login', ControllerUser.login)

router.get('/user', authenticate, ControllerUser.findById)

router.post('/googleSignIn', ControllerUser.googleSignIn)

module.exports = router