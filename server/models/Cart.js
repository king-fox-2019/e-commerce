const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    BuyerId: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    ProductId: {
        type: Schema.Types.ObjectId,
        ref : 'Product'
    },
    quantity: {
        type: Number,
        min: 1,
        required:true
    },
    isComplete:{
        type: Boolean
    }
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart