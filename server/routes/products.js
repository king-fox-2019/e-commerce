const router = require('express').Router();
const ProductController = require('../controllers/product');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/adminAuthorize');

router.post('/', authenticate, authorize, ProductController.create);
router.put('/:id', authenticate, authorize, ProductController.update);
router.get('/', ProductController.showAll);
router.get('/:id', ProductController.showOne);
router.delete('/:id', authenticate, authorize, ProductController.destroy);

module.exports = router;