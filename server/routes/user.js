const router = require("express").Router();
const User = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const passwordCheck = require("../middlewares/passwordCheck");

router.post("/signup", User.signUpUser);
router.post("/signin", User.signInUser);
router.patch(
  "/becomeaseller",
  authentication,
  passwordCheck,
  User.becomeASeller
);

module.exports = router;
