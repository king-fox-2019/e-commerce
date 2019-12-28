const router = require('express').Router();
const userRouter = require('./user');
const itemRouter =require('./item');

router.use('/api/user', userRouter);
router.use('/api/item', itemRouter);

module.exports = router;