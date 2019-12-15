const { Schema, model} = require('mongoose')

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    itemId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    price: {
        type: Number,
        required: true
    },
    ongkir: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
}, {timestamps: true})

const Transaction = model('Transaction', transactionSchema)

module.exports = Transaction