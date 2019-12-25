const Product = require("../models/Product");

class ProductController {
  static createProduct(req, res, next) {
    const { name, price, image, stock } = req.body;
    const docs = {
      name,
      price,
      image,
      stock
    };
    Product.create(docs)
      .then(product => {
        res.status(201).json({ message: "Success add product", product });
      })
      .catch(err => {
        next(err);
      });
  }
  static getProducts(req, res, next) {
    const condition = {};
    const _id = req.params.id;
    if (_id) {
      condition._id = _id;
    }
    Product.find(condition)
      .then(products => {
        res.status(200).json({ message: "Success get products", products });
      })
      .catch(err => {
        next(err);
      });
  }
  static updateProduct(req, res, next) {
    const id = req.params.id;
    const { name, price, stock, image } = req.body;
    const update = { name, price, stock, image };
    const option = {
      new: true,
      omitUndefined: true
    };
    Product.findByIdAndUpdate(id, update, option)
      .then(updatedProduct => {
        res
          .status(200)
          .json({ message: "Success update product", product: updatedProduct });
      })
      .catch(err => {
        next(err);
      });
  }
  static deleteProduct(req, res, next) {
    const id = req.params.id;
    const options = {
      rawResult: true
    };
    Product.findByIdAndDelete(id, options)
      .then(resultDelete => {
        if (resultDelete.lastErrorObject.n > 0) {
          res
            .status(200)
            .json({ message: "Success delete product", result: resultDelete });
        } else {
          throw {
            status: 404,
            message: "Product not found"
          };
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = ProductController;
