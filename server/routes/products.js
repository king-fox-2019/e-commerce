"use strict";

const router = require("express").Router();
const ProductController = require("../controllers/productController");
const { authorization } = require("../middlewares/auth");
const { multer, sendUploadToGCS } = require("../middlewares/gcs");

router.post(
  "/",
  multer.single("image"),
  sendUploadToGCS,
  ProductController.create
);
router.get("/", ProductController.readAll);
router.get("/:id", ProductController.readOne);
router.patch("/:id", ProductController.update);
router.delete("/:id", authorization, ProductController.remove);

module.exports = router;
