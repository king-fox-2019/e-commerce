const router = require("express").Router();
const controller = require("../controllers/user");

router.post("/", controller.register);
router.post("/login", controller.login); 

module.exports = router;
