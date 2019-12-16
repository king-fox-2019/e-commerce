const User = require("../models/user");
const Product = require('../models/product')
const Transaction = require('../models/transaction')
const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { verifyToken } = require('../helpers/jwt')
const mongoose = require('mongoose')


class userController {
  static register = (req, res, next) => {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role:"buyer"
    })
      .then(user => {
        let token = generateToken({id:user.id})
        res.status(201).json({access_token:token});
      })
      .catch(err =>{
        next(err)
      });
  };
  static login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          if (checkPassword(req.body.password,user.password)){
            if(user.role==="admin"){
              let token = generateToken({id:user.id})
              res.status(201).json({ access_token: token, admin: user.role})  
            }else{
              let token = generateToken({id:user.id})
              res.status(201).json({ access_token: token });
            }
          }else throw { name: 400, message: `wrong password` };
        } else throw { name: 404, message: `user not found` };
      })
      .catch(next);
  };
  static toCart = (req,res,next) => {
    let decoded = verifyToken(req.headers.access_token)
    if(req.query.empty){
      User.updateOne({_id:decoded.id},{
        $set: {cart:[]}
      })
      .then(result=>res.status(201).json(result))
      .catch(err=>next(err))
    }else if(req.query.productId){
      User.updateOne({_id:decoded.id},{
        $pull:{cart:{_id:req.query.productId}}
      })
      .then(result=>res.status(201).json(result))
      .catch(err=>next(err))
    }else{
      User.updateOne({_id:decoded.id},{
        $push: {cart:req.body.cart}
      })
      .then(result=>res.status(201).json(result))
      .catch(err=>next(err))
    }
  }
  static getCart = (req,res,next) => {
    let decoded = verifyToken(req.headers.access_token)
    User.findOne({_id:decoded.id})
    .then(user=>{
      res.status(200).json(user.cart)
    })
    .catch(err=>next(err))
  }
  static checkout = (req,res,next) => {
    let updates = []
    let array = []
    let decoded = verifyToken(req.headers.access_token)
    req.body.item.forEach(function (item) {
      let updatePromise = Product.updateOne({_id:mongoose.Types.ObjectId(item._id)},{$inc:{stock: -item.quantity}})
      console.log(updatePromise)
      updates.push(updatePromise)
    })
    Promise.all(updates)
      .then(function(results){
        res.status(201).json(results)
      })

    User.updateOne({_id:mongoose.Types.ObjectId(decoded.id)},{$set:{cart:[]}})
    
    req.body.item.forEach(function(item){
      console.log(item)
      Transaction.create({
        userId:decoded.id,
        productId:mongoose.Types.ObjectId(item._Id),
        quantity:item.quantity,
        status:"not done"
      })
    })
  }
}

module.exports = userController;
