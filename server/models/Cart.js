const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        item: { type: Schema.Types.ObjectId,  ref: 'Product' },
        quantity: { type: Number }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;