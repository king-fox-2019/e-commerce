const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')
const {hashPassword} = require('../helpers/bcrypt')

const buyerSchema = new Schema({
   name: {
      type: String
   },
   email: {
      type: String,
      required: [true, `Please write your user's email`],
      unique: [true, 'This email has already been registered in our server'],
      validate: {
         validator: (v) => {
            return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(v)
         }
      }
   },
   password: {
      type: String,
      required: [true, 'Please enter password']
   },
   cart: [{
      item: {
         type: Schema.Types.ObjectId,
         ref: 'Item'
      },
      quantity: {
         type: Number,
         default: 0
      }
   }],
   googleSignIn: {
      type: Boolean,
      default: false
   }
})

buyerSchema.plugin(timestamp)

buyerSchema.pre('save', function(next) {
   this.password = hashPassword(this.password)
   next()
})

const Buyer = mongoose.model('Buyer', buyerSchema)

module.exports = Buyer