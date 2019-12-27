const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  stock: {
    type: Number,
    default: 1
  },
  UserId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, {
  timestamps:true
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item