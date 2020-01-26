const router = require('express').Router();
const transactionController = require('../controller/transaction');
const checkToken = require('../middleware/checkToken');
const authentication = require('../middleware/authentication');

router.use(checkToken);

router.post(
    '/checkout',
    authentication,
    transactionController.checkoutCart
);
router.patch(
    '/:status/:id',
    authentication,
    transactionController.updateStatus
);
router.get(
    '/purchased',
    authentication,
    transactionController.getTransactionsPurchase
);
router.get(
    '/sells',
    authentication,
    transactionController.getTransactionsSelling
);

module.exports = router;