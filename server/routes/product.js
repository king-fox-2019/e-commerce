const router = require("express").Router();
const Product = require("../controllers/ProductController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/:id", Product.getProducts);
router.get("/", Product.getProducts);
router.use(authentication);
router.use(authorization);
router.post("/", Product.createProduct);
router.put("/:id", Product.updateProduct);
router.delete("/:id", Product.deleteProduct);

module.exports = router;
