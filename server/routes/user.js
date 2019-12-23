const router = require("express").Router();
const User = require("../controllers/userController");
const verify = require("../middlewares/googleVerify");
const { authentication } = require("../middlewares/auth");

router.post("/signup", User.signup);
router.post("/login", User.login);
router.post("/googleLogin", verify, User.googleSignin);
router.use(authentication);
router.get("/", User.getCash);
router.patch("/", User.addCash);

module.exports = router;
