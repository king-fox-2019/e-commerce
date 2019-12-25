const User = require("../models/User");

module.exports = (req, res, next) => {
  const id = req.decoded._id;
  User.findById(id)
    .then(user => {
      if (user.status === "Seller") {
        next();
      } else {
        throw {
          status: 403,
          message: "You must be a seller first"
        };
      }
    })
    .catch(err => {
      next(err);
    });
};
