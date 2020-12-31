const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  if (req.headers.access_token) {
    jwt.verify(req.headers.access_token, process.env.JWT_SECRET, function(
      err,
      decoded
    ) {
      if (err) throw { name: 401, message: "you are not authorized" };
      else {
        req.decoded = decoded;
        User.findOne({ _id: req.decoded.id })
          .then(user => {
            if (user) next();
            else throw { name: 401, message: "you are not authorized" };
          })
          .catch(err => next(err));
      }
    });
  } else {
    next({ name: 401, message: "you are not authorized" });
  }
}

module.exports = { authentication };
