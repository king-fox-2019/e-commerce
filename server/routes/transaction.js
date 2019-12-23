const router = require("express").Router();
const Transaction = require("../controllers/transactionController");
const { authentication, authorizationRole } = require("../middlewares/auth");

router.use(authentication);
router.get("/", authorizationRole, Transaction.getTransaction);

module.exports = router;
