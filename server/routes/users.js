const router = require("express").Router();
const auth = require("../middlewares/auth");
const UserController = require("../controllers/UserController.js");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/registeradmin", auth.authentication , auth.superAdminOnly, UserController.inviteAdmin);
router.post("/registersuperadmin", UserController.createSuperAdmin);
router.patch("/", auth.authentication, UserController.update);
router.get("/profile", auth.authentication, UserController.getUser);

module.exports = router;