
const Buyer = require('../models/Buyer')
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
}

module.exports = BuyerController