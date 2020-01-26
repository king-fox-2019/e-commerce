const router = require('express').Router();
const userRouter = require('./user');
const itemRouter = require('./item');
const transactionRouter = require('./transaction');

router.use('/api/users', userRouter);
router.use('/api/items', itemRouter);
router.use('/api/transactions', transactionRouter);

module.exports = router;