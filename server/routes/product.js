const router = require("express").Router();
const controller = require("../controllers/product");

router.post("/", controller.addNewProduct);
router.delete("/:id", controller.destroy);
router.get("/", controller.getAllProduct);

module.exports = router;
