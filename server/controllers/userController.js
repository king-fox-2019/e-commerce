const User = require("../models/user");
const { validatePass } = require('../helpers/bcrypt')
const { generateToken }= require('../helpers/jwt')

class UserController {
  /* testing
  static register(req, res, next) {
    let usernames = [];
    let emails = [];
    if (!req.body.username) {
      res.status(400).json({ message: "Username required" });
    } else if (!req.body.email) {
      res.status(400).json({ message: "Email required" });
    } else if (!req.body.password) {
      res.status(400).json({ message: "Password required" });
    } else if (req.body.password.length < 8) {
      res.status(400).json({
        message: "Password should be at least 8 characters in length"
      });
    } else if (usernames.includes(req.body.username)) {
      res.status(400).json({
        message: "Username already registered"
      });
    } else if (emails.includes(req.body.email)) {
      res.status(400).json({
        message: "Email already registered"
      });
    } else {
      usernames.push(req.body.username);
      emails.push(req.body.email);
      let user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      };
      res.status(201).json(user);
    }
  } */

  static register(req, res, next) {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      user.save()
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }

  static login(req, res, next) {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (!user) {
          let err = {
            status: 404,
            message: "Email and/or password incorrect"
          };
          next(err);
        } else if (validatePass(req.body.password, user.password)) {
          let payload = { id: user._id, email: user.email };
          let access_token = generateToken(payload);
          res.status(200).json({ access_token: access_token });
        } else {
          let err = {
            status: 403,
            message: "Email and/or password incorrect"
          };
          next(err);
        }
      })
      .catch(next);
  }

  static read (req, res, next) {
    User.findById(req.decoded.id)
      .populate('cart.ProductId')
      .then(user => {
        console.log(user)
        res.status(200).json(user)
      })
      .catch(next)
  }

  static createCart (req, res, next) {
    User.findByIdAndUpdate(req.decoded.id,
      {$set: {cart: req.body.cart}
    })
      .then(() => {
        return User.findById(req.decoded.id)
        .populate('cart.ProductId')
      })
      .then(user => {
        // console.log(user.cart)
        res.status(200).json(user.cart)
      })
      .catch(next)
  }

  static deleteCart (req, res, next) {
    User.findByIdAndUpdate(req.decoded.id,
      {$set: {cart: []}
    })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
  }

}

module.exports = UserController;
