const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema ({
    User_id:{
        type : Schema.Types.ObjectId, ref : 'User'
    },
    Stock_id:{
        type : Schema.Types.ObjectId, ref : 'Stock'
    },
    count : {
        type : Number
    },
    total_payment : {
        type : Number
    },
    address : {
        type: String,
        required: [true, 'address is required']
    },
})

const Transaction = mongoose.model('Transaction',TransactionSchema)

module.exports = Transaction
