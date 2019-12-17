const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const CartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
      },
    count: Number,
    status: {
        type:Boolean,
        default:false
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
});

const Model = mongoose.model('Cart', CartSchema)
module.exports = Model