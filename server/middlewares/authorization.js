const { Cart } = require("../models");

function authorization(req, res, next) {
  Cart.findById(req.params.cartId)
    .then(cart => {
      if (cart.userId == req.decoded._id) {
        next();
      } else {
        throw { status: 403, message: "Forbidden access" };
      }
    })
    .catch(next);
}

module.exports = authorization