const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { authentication, adminAuthorization, authorization } = require('../middlewares/auth')
const gcsUpload = require('../middlewares/gcsUpload')

router.get('/', ProductController.readAll)
router.use(authentication)
router.get('/:id', ProductController.readOne)

router.use(adminAuthorization)
router.post('/', gcsUpload.single('image'), ProductController.create)
router.put('/:id', authorization, gcsUpload.single('image'), ProductController.updateField)
router.delete('/:id', authorization, ProductController.deleteProduct)

module.exports = router