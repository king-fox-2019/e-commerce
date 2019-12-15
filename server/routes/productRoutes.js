const express = require("express");
const product = express.Router();
const { productController } = require("../controllers");
const { authentication, authorization } = require("../middlewares");
const  gcsMiddlewares = require("../middlewares/google-cloud-storage")
const multer = require("multer");

const upload = multer({
  storage: multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
});

product.get("/", productController.showProducts)
product.get("/:productId", productController.showProduct)

product.use(authentication)
product.post("/", productController.addProduct)
product.patch("/:productId", authorization, productController.editProduct);
product.delete("/:productId", authorization, productController.deleteProduct);

module.exports = product;