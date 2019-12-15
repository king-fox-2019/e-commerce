const router = require('express').Router()
const BuyerController = require('../controllers/buyer')

router.post('/register', BuyerController.register)
router.post('/signin', BuyerController.login)

module.exports = router