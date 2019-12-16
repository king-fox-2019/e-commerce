const router = require('express').Router()
const BuyerController = require('../controllers/buyer')
const {authentication} = require('../middlewares/auth')

router.get('/secretEndpointGetUsers', (req, res, next) => {
   const Buyer = require('../models/Buyer')

   Buyer
   .find()
   .populate('cart.item')
   .then(buyers => res.status(200).json({buyers}))
   .catch(next)
})

router.post('/register', BuyerController.register)
router.post('/signin', BuyerController.login)
router.patch('/addToCart', authentication, BuyerController.addToCart)
router.get('/', authentication, BuyerController.getUserData)
router.patch('/checkoutCart', authentication, BuyerController.checkout)

module.exports = router