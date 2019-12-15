const router = require('express').Router()
const UserController = require('../controllers/user')
const { authenticate, authorizationCustomer } = require('../middlewares/auth')

// register user
router.post('/register', UserController.registerUser)

// login user
router.post('/login', UserController.loginUser)

// authentikasi
router.use(authenticate)

// get one user info
router.get('/info', UserController.getUserInfo)

// edit profile user
router.put('/setting', UserController.editProfile)

// get balancce
router.get('/gold', authorizationCustomer, UserController.getGold)

// update gold
router.put('/balance', authorizationCustomer , UserController.topUp)

module.exports = router