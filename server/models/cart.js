const { Schema,model } = require('mongoose')

const cartSchema = new Schema({
    productId:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    amount:{
        type: Number
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    versionKey: false,
    timestamps: true
})

const Cart = model('Cart', cartSchema)

module.exports = Cart

