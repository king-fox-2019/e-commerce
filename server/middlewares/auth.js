"use strict";

const { verifyToken } = require("../helpers/jwt");
const Product = require("../models/product");

module.exports = {
  authentication(req, res, next) {
    if (!req.headers.access_token) {
      throw { errorCode: 401, message: "You must log in first" };
    }
    try {
      req.decoded = verifyToken(req.headers.access_token);
      next();
    } catch (err) {
      next({ status: 401, message: "You must log in first" });
    }
  },

  authorization(req, res, next) {
    Product.findById(req.params.id)
      .then(product => {
        if (product) {
          if (String(product.UserId) === String(req.decoded.id)) {
            next();
          } else {
            next({ status: 401, message: "Unauthorized process" });
          }
        } else {
          next({ status: 404, message: "Product not found" });
        }
      })
      .catch(next);
  }
};
