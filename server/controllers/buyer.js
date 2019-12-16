
const Buyer = require('../models/Buyer')
const Item = require('../models/Item')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_SIGNIN_CLIENT_ID);
const {comparePassword} = require('../helpers/bcrypt')

class BuyerController {
   
   static register (req, res, next) {

      const {name, email, password} = req.body

      Buyer
      .create({name, email, password})
      .then(buyer => {
         res.status(201).json({
            access_token: jwt.sign({
               buyerId: buyer._id
            }, process.env.JWT_SECRET, {expiresIn: "1d"})
         })
      })
      .catch(next)
   }

   static login (req, res, next) {

      const {email, password} = req.body

      Buyer
      .findOne({email})
      .then(buyer => {
         if(!buyer) throw {
            code: 400,
            message: 'Invalid email and or password combination'
         }
         else if(!comparePassword(password, buyer.password)) throw {
            code: 400,
            message: 'Invalid email and or password combination'
         }
         else {
            res.status(200).json({
               access_token: jwt.sign({
                  buyerId: buyer._id
               }, process.env.JWT_SECRET, {expiresIn: "1d"})
            })
         }
      })
      .catch(next)
   }

   static googleSignIn (req, res, next) {

      const inputs = {}

      client.verifyIdToken({
         idToken: req.body.id_token,
         audience: process.env.GOOGLE_SIGNIN_CLIENT_ID
      })
      .then(LoginTicket => {
         const payload = LoginTicket.getPayload()
         inputs.name = payload.name
         inputs.email = payload.email
         inputs.password = hashPassword(Math.random().toString(36).slice(-8))

         Buyer.findOne({email: inputs.email})
      })
      .then(buyer => {
         if(!buyer) {
            Buyer.create(inputs)
         }
         else {
            return jwt.sign({}, process.env.JWT_SECRET, {expiresIn: "1d"})
         }
      })
      .then(buyerOrToken => {
         if(typeof userOrToken == 'string') {
            res.status(200).json({
               access_token: userOrToken
            })
         }
         else {
            res.status(201).json({
               access_token: jwt.sign({
                  buyerId: buyerOrToken._id
               }, process.env.JWT_SECRET, {expiresIn: "1d"})
            })
         }
      })
      .catch(next)
   }

   static addToCart(req, res, next) {
      
      Buyer
      .findOne({_id: req.decoded.buyerId})
      .then(tempBuyer => {

         if(!tempBuyer) throw {
            code: 400,
            message: 'Buyer not found'
         }
         else if(req.body.quantity < 1) throw {
            code: 400,
            message: 'Quantity cannot be lower than 1'
         }

         // check if item already exist in the cart
         // if item exist, add the quantity
         // if not exist, push the item to the cart

         let itemInCartIndex = -1

         for(let i in tempBuyer.cart) {
            if(tempBuyer.cart[i]._id == req.body.itemId) {
               itemInCartIndex = Number(i)
               break
            }
         }
         console.log('itemIncartIndex', itemInCartIndex)
         if(itemInCartIndex == -1) {
            tempBuyer.cart.push({
               item: req.body.itemId,
               quantity: Number(req.body.quantity)
            })
         }
         else {
            tempBuyer.cart[itemInCartIndex].quantity = Number(req.body.quantity)
         }

         return Buyer.updateOne({_id: tempBuyer._id}, {$set: {cart: tempBuyer.cart}})
      })
      .then(() => res.status(200).json({message: 'Cart updated'}))
      .catch(next)
   }

   static getUserData(req, res, next) {

      Buyer
      .findOne({_id: req.decoded.buyerId})
      .populate('cart.item')
      .then(buyer => res.status(200).json({
         name: buyer.name,
         cart: buyer.cart
      }))
      .catch(next)
   }

   static checkout(req, res, next) {

      let cart

      Buyer
      .findOne({_id: req.decoded.buyerId})
      .then(buyer => {
         cart = buyer.cart
         const itemPromises = []

         buyer.cart.forEach(cartItem => {
            itemPromises.push(Item.findOne({_id: cartItem.item}))
         })

         return Promise.all(itemPromises)
      })
      .then(items => {
         let checkoutPromises = []
         // console.log('check items availability')
         // console.log(cart)
         // console.log(items)

         for(let i in items) {
            // console.log(cart[i].quantity)
            if(items[i].stock < cart[i].quantity) {
               throw {
                  code: 400,
                  message: 'One or more items stock cannot fulfill your request'
               }
            }

            checkoutPromises.push(Item.updateOne({
               _id: cart[i].item
            }, {
               $set: {
                  stock: items[i].stock - cart[i].quantity
               }
            }))
         }

         return Promise.all(checkoutPromises)
      })
      .then(() => {
         // console.log('checkoutPromises done')
         return Buyer.updateOne({_id: req.decoded.buyerId}, {$set: {cart: []}})
      })
      .then(() => {
         // console.log('clearing cart done')
         res.status(200).json({message: 'Checkout success'})
      })
      .catch(next)
   }
}

module.exports = BuyerController