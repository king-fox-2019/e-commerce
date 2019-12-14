`use strict`

const express = require('express')
const router = express.Router()
const ControllerProduct = require('../controllers/productC')
const { authenticating, authorizating } = require('../middlewares/auth')


router.get('/', ControllerProduct.showAllProducts)

router.use(authenticating)

router.post('/add', ControllerProduct.addProduct)

// <!-- this one for tokopedia looks like e-commerce -->
// router.get('/myproduct', ControllerProduct.myproduct)

router.use(authorizating)

router.delete('/:id', ControllerProduct.deleteProduct)

router.patch('/:id', ControllerProduct.updateProductData)


module.exports = router