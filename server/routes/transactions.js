const router = require('express').Router();
const TransactionController = require('../controllers/transaction');
const authenticate = require('../middlewares/authenticate');

router.post('/', authenticate, TransactionController.checkout);
router.put('/:id', authenticate, TransactionController.updateStatus);
router.get('/', authenticate, TransactionController.showAll);
router.get('/admin', authenticate, TransactionController.showAllAdminAccess);
router.get('/:id', authenticate, TransactionController.showOne);

module.exports = router;