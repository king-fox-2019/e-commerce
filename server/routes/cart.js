const router = require("express").Router();
const Cart = require("../controllers/CartController");
const authentication = require("../middlewares/authentication");

router.post("/", authentication, Cart.createCart);
router.patch("/", authentication, Cart.updateCart);
router.get("/", authentication, Cart.fetchCartUser);
router.delete("/:id", authentication, Cart.deleteCart);

module.exports = router;
