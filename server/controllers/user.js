"use strict";

const { User } = require("../models");
const { compare } = require("../helpers/bcryptjs");
const jwt = require("../helpers/jsonwebtoken");

class UserController {
  static register(req, res, next) {
    const newUser = {
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password
    };
    User.create(newUser)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(next);
  }
  static login(req, res, next) {
    let { email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if (!user) {
          next({ isThrow: true, status: 404, message: "user not found" });
        } else {
          if (compare(password, user.password)) {
            const payload = {
              id: user._id,
              fullname: user.fullname
            };
            const token = jwt.sign(payload);
            res.status(200).json({ token: token });
          } else {
            next({
              isThrow: true,
              status: 401,
              message: "Email / Password Salah"
            });
          }
        }
      })
      .catch(next);
  }
}

module.exports = UserController;
