const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = (req, res, next) => {
  const id = req.decoded._id;
  const password = req.body.password;
  User.findById(id)
    .then(user => {
      if (user.status === "Seller") {
        throw "User is seller";
      } else {
        const match = bcrypt.compareSync(password, user.password);
        if (match) {
          next();
        } else {
          throw "Wrong Password";
        }
      }
    })
    .catch(err => {
      const responses = {
        message: err
      };
      res.status(403).json(responses);
      console.log(err);
    });
};
