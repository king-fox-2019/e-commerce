const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')

const itemSchema = new Schema({
   name: {
      type: String,
      required: [true, `Please enter the item's name`]
   },
   description: {
      type: String,
      default: 'no description'
   },
   image: {
      type: String,
      default: ''
   },
   price: {
      type: Number,
      default: 0
   },
   stock: {
      type: Number,
      default: 0
   }
})

itemSchema.plugin(timestamp)

const Item = mongoose.model('Item', itemSchema)

module.exports = Item