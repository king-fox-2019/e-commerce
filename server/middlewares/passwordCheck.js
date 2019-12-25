const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = (req, res, next) => {
  const id = req.decoded._id;
  const password = req.body.password;
  User.findById(id)
    .then(user => {
      if (user.status === "Seller") {
        throw {
          status: 403,
          message: "User is seller"
        };
      } else {
        const match = bcrypt.compareSync(password, user.password);
        if (match) {
          next();
        } else {
          throw {
            status: 401,
            message: "Wrong Password"
          };
        }
      }
    })
    .catch(err => {
      next(err);
    });
};
