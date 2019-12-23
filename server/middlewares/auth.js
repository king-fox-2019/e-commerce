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
  try {
    if (req.decoded.role === "admin") {
      next();
    } else {
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
