"use strict";

const router = require("express").Router();
const productsRouter = require("./products");
const usersRouter = require("./users");
const { authentication } = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Connected to E-commerce website!"
  });
});

router.use("/users", usersRouter);
router.use(authentication);
router.use("/products", productsRouter);

module.exports = router;
