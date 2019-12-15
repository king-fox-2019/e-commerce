const { Product } = require("../models");

function authorization(req, res, next) {
  Product.findById(req.params.productId)
    .then(Product => {
      if (Product.seller == req.decoded._id) {
        next();
      } else {
        throw { status: 403, message: "Forbidden access" };
      }
    })
    .catch(next);
}

module.exports = authorization