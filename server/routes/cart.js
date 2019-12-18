const router = require("express").Router();
const Cart = require("../controllers/cartController");
const { authentication } = require("../middlewares/auth");

router.use(authentication);
router.post("/", Cart.create);
router.get("/", Cart.infoCart);
router.delete("/:itemId", Cart.removeItem);
router.patch("/", Cart.checkout);
router.patch("/:itemId", Cart.accItem);

module.exports = router;
