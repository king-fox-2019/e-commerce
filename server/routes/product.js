const router = require("express").Router();
const controller = require("../controllers/product");

router.get("/", controller.getAllProduct);
router.get('/:id', controller.getOneProduct);
router.post("/", controller.addNewProduct);
router.delete("/:id", controller.destroy);

module.exports = router;
