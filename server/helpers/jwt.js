const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

function decode(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  decode
}