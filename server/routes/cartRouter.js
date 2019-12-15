const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const { checkCartOwner } = require('../middlewares/authorization')

const CartCtrl = require('../controllers/CartCtrl')

router.use(authentication)
router.post('/:productId', CartCtrl.addProduct)
router.get('/', CartCtrl.getCart)
router.delete('/', CartCtrl.deleteCart)

router.patch('/:cartId', checkCartOwner, CartCtrl.updateProduct)
router.delete('/:cartId', checkCartOwner, CartCtrl.deleteProduct)

module.exports = router