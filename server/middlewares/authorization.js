const User = require("../models/User");

module.exports = (req, res, next) => {
  const id = req.decoded._id;
  User.findById(id)
    .then(user => {
      if (user.status === "Seller") {
        next();
      } else {
        const responses = {
          message: "You must be a seller first"
        };
        res.status(403).json(responses);
      }
    })
    .catch(err => {
      const responses = {
        message: "Internal Server Error"
      };
      res.status(500).json(responses);
      console.log(err);
    });
};
