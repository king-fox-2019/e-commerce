const { Schema,model } = require('mongoose')

const transactionSchema = new Schema({
    listProduct: [{
        productId:{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        amount: {
            type: Number
        },
        cost:{
            type: Number
        }
    }],
    totalCost:{
        type: Number
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type: String,
        enum: ['onprocess', 'sent', 'received']
    }
},
{
    versionKey: false,
    timestamps: true
})

const Transaction = model('Transaction', transactionSchema)

module.exports = Transaction