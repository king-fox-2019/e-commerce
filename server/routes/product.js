const router = require('express').Router()
const { authorizationAdmin, authenticate } = require('../middlewares/auth')
const ProductController = require('../controllers/product')

// create product
router.post('/', authenticate, authorizationAdmin, ProductController.createProduct)

// get all product
router.get('/', ProductController.getAllProduct)

// get one product
router.get('/:id', authenticate, ProductController.getOneProduct)

// update product
router.put('/:id', authenticate, authorizationAdmin, ProductController.updateProduct)

// update stock
router.put('/:id/stock', authenticate, ProductController.updateStock)

// delete product
router.delete('/:id', authenticate, authorizationAdmin, ProductController.deleteProduct)

module.exports = router