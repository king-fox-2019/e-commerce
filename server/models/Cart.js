const {Schema, model} = require('mongoose')
const cartSchema = new Schema ({
  userId : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  productId : {
    type: Schema.Types.ObjectId,
    ref : 'Product'
  },
  quantity : {
    type : Number,
    required: [true, 'Price cannot be empty'],
    validate : {
      validator : function(val) {
        return val < 0 ? false : true 
      },
        message: 'Price cannot be negative value'
      }
  }
})

const Cart = model('Cart', cartSchema)
module.exports = Cart 