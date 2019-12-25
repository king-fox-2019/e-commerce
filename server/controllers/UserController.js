const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("../helpers/jsonwebtoken");
const passwordGenerator = require("../helpers/passwordGenerator");

class UserController {
  static becomeASeller(req, res, next) {
    const id = req.decoded._id;
    const update = {
      status: "Seller"
    };
    User.findByIdAndUpdate(id, update)
      .then(() => {
        const responses = {
          message: "Successfully upgraded to a seller account"
        };
        res.status(200).json(responses);
      })
      .catch(err => {
        next(err);
      });
  }
  static signUpUser(req, res, next) {
    const { name, email, password } = req.body;
    const docs = {
      name,
      email,
      password,
      status: "Customer"
    };
    User.create(docs)
      .then(user => {
        const payload = {
          _id: user._id
        };
        const token = jsonwebtoken.generateToken(payload);
        const responses = {
          message: "Sign Up Success",
          token
        };
        res.status(201).json(responses);
      })
      .catch(err => {
        next(err);
      });
  }
  static signInUser(req, res, next) {
    const { email, password } = req.body;
    const condition = {
      email
    };
    if (!password) {
      throw {
        status: 400,
        message: "Password cannot be empty"
      };
    } else {
      User.findOne(condition)
        .then(user => {
          if (user) {
            const match = bcrypt.compareSync(password, user.password);
            if (match) {
              const payload = {
                _id: user._id
              };
              const token = jsonwebtoken.generateToken(payload);
              const responses = {
                message: "Sign In Success",
                token
              };
              res.status(200).json(responses);
            } else {
              throw { status: 401, message: "Wrong password" };
            }
          } else {
            throw {
              status: 404,
              message: "User not found"
            };
          }
        })
        .catch(err => {
          next(err);
        });
    }
  }
  static signInGoogle(req, res, next) {
    const { gProfile } = req.body;
    const condition = {
      email: gProfile.U3
    };
    User.findOne(condition)
      .then(user => {
        if (user) {
          const payload = { _id: user._id };
          const token = jsonwebtoken.generateToken(payload);
          const responses = {
            message: "Sign in success",
            token
          };
          res.status(201).json(responses);
        } else {
          const password = passwordGenerator();
          const docs = {
            name: gProfile.ig,
            email: gProfile.U3,
            password,
            status: "Customer"
          };
          User.create(docs)
            .then(user => {
              const payload = { _id: user._id };
              const token = jsonwebtoken.generateToken(payload);
              const responses = {
                message: "Sign in success",
                token
              };
              res.status(201).json(responses);
            })
            .catch(err => {
              next(err);
            });
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = UserController;
