const router = require('express').Router()
const productController = require('../controller/productController')

router.get('/',productController.getProducts)
router.post('/',productController.createProduct)
router.put('/',productController.updateProduct)
router.delete('/',productController.deleteProduct)

module.exports = router