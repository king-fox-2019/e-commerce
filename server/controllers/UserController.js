const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("../helpers/jsonwebtoken");

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
        console.log(err);
        const responses = {
          message: "Internal Server Error"
        };
        res.status(500).json(responses);
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
        res.status(400).json({ message: err.name });
      });
  }
  static signInUser(req, res, next) {
    const { email, password } = req.body;
    const condition = {
      email
    };
    if (!password) {
      res.status(400).json({ message: "Password cannot be empty" });
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
              res.status(400).json({ message: "Wrong password" });
            }
          } else {
            res.status(400).json({ message: "User not found" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({ message: err.errors });
        });
    }
  }
}

module.exports = UserController;
