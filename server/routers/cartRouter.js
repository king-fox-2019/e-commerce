const router = require('express').Router()
const CartController = require('../controllers/CartController')

const authentication = require('../middlewares/authentications')
const authorizationBuyer = require('../middlewares/authorizationCartBuyer')
const cartExistingCheck = require('../middlewares/cartExistingCheck')
const productStockCheckingUpdate = require('../middlewares/productStockCheckingUpdate')



router.get('/test', CartController.test)
// USE WITH CAUTION
router.delete('/masterDeleteAll', CartController.masterDeleteAll)


router.use(authentication('buyer'))
// =======================================================
router.get('/', CartController.viewCartByUser)
router.post('/', productStockCheckingUpdate,  CartController.create)



router.use(cartExistingCheck)
router.use(authorizationBuyer)
router.use(productStockCheckingUpdate)
// =======================================================
router.put('/?', CartController.putUpdate)
router.patch('/?', CartController.patchUpdate)
router.delete('/?', CartController.delete)



module.exports = router