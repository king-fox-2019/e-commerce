const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        image: { type: String }
    }],
    total: Number,
    status: {
        type: String,
        enum: ['AWAITING_PAYMENT', 'PROCESSING_ORDER', 'ORDER_RECEIVED'],
        default: 'AWAITING_PAYMENT'
    }
},{
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;