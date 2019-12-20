const router = require('express').Router();
const {ProductController} = require('../controllers');

router.get('/', ProductController.getAllProducts);
router.get('/details', ProductController.getDetailProduct);
router.post('/', ProductController.addNewProduct);
router.delete('/', ProductController.deleteProduct);
router.put('/', ProductController.updateProduct);
router.patch('/', ProductController.updateProduct);

module.exports = router;
