const User = require("../models/user");
const { comparePassword } = require("../helpers/bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static signup(req, res, next) {
    const { name, email, password } = req.body;
    User.create({
      name,
      email,
      password
    })
      .then(response => {
        let payload = {
          id: response._id,
          email: response.email,
          name: response.name,
          role: response.role
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(201).json({
          token,
          response,
          message: "Success Sign Up"
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      email
    })
      .then(response => {
        if (!response) {
          throw {
            status: 404,
            message: "Email / Password is Wrong!"
          };
        } else {
          if (password === "" || password === null) {
            throw {
              status: 404,
              message: "Password Required"
            };
          } else {
            if (!comparePassword(password, response.password)) {
              throw {
                status: 404,
                message: "Email / Password is Wrong!"
              };
            } else {
              let payload = {
                id: response._id,
                email: response.email,
                name: response.name,
                role: response.role
              };
              let token = jwt.sign(payload, process.env.JWT_SECRET);
              res.status(200).json({
                token,
                response,
                message: "Success Login"
              });
            }
          }
        }
      })
      .catch(next);
  }

  static googleSignin(req, res, next) {
    User.findOne({
      email: req.decoded.email
    })
      .then(response => {
        if (response) {
          return response;
        } else {
          return User.create({
            name: req.decoded.name,
            email: req.decoded.email,
            password: process.env.DEFAULT_PASSWORD,
            image: req.decoded.picture
          });
        }
      })
      .then(response => {
        // console.log(response);
        let payload = {
          id: response._id,
          name: response.name,
          email: response.email
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(201).json({
          token,
          response
        });
      })
      .catch(next);
  }

  static addCash(req, res, next) {
    const cash = Number(req.body.cash);
    if (typeof cash != "number") {
      throw {
        status: 400,
        message: "Input must be Number"
      };
    } else if (cash < 0) {
      throw {
        status: 400,
        message: "Cant input less then 0"
      };
    } else {
      User.findOneAndUpdate(
        {
          email: req.decoded.email
        },
        {
          cash
        },
        {
          new: true
        }
      )
        .then(response => {
          res.status(200).json(response);
        })
        .catch(next);
    }
  }

  static getCash(req, res, next) {
    User.findOne({
      email: req.decoded.email
    })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(next);
  }
}

module.exports = UserController;
