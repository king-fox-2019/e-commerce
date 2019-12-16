const jwt = require("jsonwebtoken");
const Item = require("../models/item");

function authentication(req, res, next) {
  try {
    let token = req.headers.token;
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (err) {
    next(err);
  }
}

function authorizationRole(req, res, next) {
  console.log(req.decoded);
  try {
    if (req.decoded.role === "admin") {
      next();
    } else {
      console.log("===============");
      throw {
        status: 401,
        message: "Just Admin Can Handle This Menu"
      };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authentication,
  authorizationRole
};
