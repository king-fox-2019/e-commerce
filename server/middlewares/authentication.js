const jwt = require("../helpers/jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const accessToken = req.headers.access_token;
    const payload = jwt.verifyToken(accessToken);
    req.decoded = payload;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};
