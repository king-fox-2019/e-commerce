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
    },
    receiver : {
        type : String,        
    },
    payment_status : {
        type : Boolean,
        default : false
    },
    receive_status : {
        type : Boolean,
        default : false
    },
    delivery_cost : {
        type : Number,
    },
    date : {
        type : Date,
        default : new Date()
    }
})

const Transaction = mongoose.model('Transaction',TransactionSchema)

module.exports = Transaction
