const router = require('express').Router();
const {CartController} = require('../controllers');
const {authenticate} = require('../middlewares');

router.use(authenticate);
router.get('/', CartController.getAllCart);
router.post('/', CartController.upsertCart);
router.delete('/', CartController.deleteCart);

module.exports = router;
