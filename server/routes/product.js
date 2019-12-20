const router = require('express').Router(),
  ProductController = require('../controllers/product'),
  { authenticate, authorize } = require('../middlewares/auth')

router.get('/', ProductController.all)
router.use(authenticate)
router.post('/create', authorize, ProductController.create)
// router.post('/create', ProductController.create)
router.delete('/:id', authorize, ProductController.delete)

module.exports = router