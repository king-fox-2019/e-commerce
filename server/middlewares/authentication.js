"use strict";

const { User } = require("../models");
const jwt = require("../helpers/jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.token || null;
  if (token) {
    let decoded = jwt.verify(token);
    let { id } = decoded;
    User.findById(id)
      .then(user => {
        if (!user) {
          next({
            isThrow: true,
            status: 404,
            message: "User not found"
          });
        } else {
          req.token = decoded;
          next();
        }
      })
      .catch(next);
  }
};
