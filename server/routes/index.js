const router = require("express").Router();
const userRouter = require("./user");
const itemRouter = require("./item");
const cartRouter = require("./cart");
const transactionRouter = require("./transaction");

router.use("/items", itemRouter);
router.use("/users", userRouter);
router.use("/carts", cartRouter);
router.use("/transactions", transactionRouter);

module.exports = router;
