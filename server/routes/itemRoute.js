const router = require('express').Router()
const { authenticate, authorize } = require('../middlewares/auth')
const ItemController = require('../controllers/itemController')

router.get('/', ItemController.showAll)
router.get('/myItem', authenticate, ItemController.showMyItem)
router.get('/cart', authenticate, ItemController.myCart)
router.get('/:id', ItemController.showOne)
router.use(authenticate)
router.post('/cart/:id', ItemController.addToCart)
router.delete('/cart/:id', ItemController.deleteFromCart)
router.post('/', ItemController.postItem)
router.patch('/:id', authorize, ItemController.editItem)
router.delete('/:id', authorize, ItemController.deleteItem)

module.exports = router