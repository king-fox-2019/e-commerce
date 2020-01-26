const router = require('express').Router();
const controllerItem = require('../controller/Item');
const checkToken = require('../middleware/checkToken');

router.get('/', controllerItem.list);
router.get('/:itemName', controllerItem.findItem);

router.use(checkToken);

router.post('/register', controllerItem.register);

module.exports = router;