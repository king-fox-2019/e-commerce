const {model, models, Schema} = require('mongoose');

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id required']
    },
    status: {
        type: String,
        required: [true, 'transaction status required']
    },
    itemDetails: {
        type: Object,
        required: [true, 'Item details required']
    },
    itemAmount: {
        type: Number,
        required: [true, 'Item amount required']
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price required']
    },
    createdAt: {
        type: Date,
        required: [true, "transaction date required"]
    },
});

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;

