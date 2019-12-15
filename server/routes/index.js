const router = require('express').Router();
const userRouter = require('./user-router');

router.use('/users', userRouter);

router.get('/', function(req, res, next) {
  res.send('server alive!');
});

module.exports = router;
