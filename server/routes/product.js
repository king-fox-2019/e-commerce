const router = require('express').Router(),
  ProductController = require('../controllers/product')

router.get('/', ProductController.all)
router.post('/create', ProductController.create)
router.delete('/:id', ProductController.delete)

module.exports = router