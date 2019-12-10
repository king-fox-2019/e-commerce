const router = require("express").Router();
const controller = require("../controllers/cart");
const authentication = require('../middlewares/authentication');

router.use(authentication)
router.post("/", controller.create);

module.exports = router;
