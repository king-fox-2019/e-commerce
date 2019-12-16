"use strict";

const router = require("express").Router();
const UserController = require("../controllers/userController");
const { authentication } = require("../middlewares/auth");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/", authentication, UserController.read);
router.post("/cart", authentication, UserController.createCart);
router.patch("/cart", authentication, UserController.deleteCart);
router.get("/updateCart", authentication, UserController.updateCart);

module.exports = router;
