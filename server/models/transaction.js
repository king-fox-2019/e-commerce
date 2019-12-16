const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    userId:String,
    productId:String,
    quantity:String,
    status:String
})

const Transaction = mongoose.model('Transaction',transactionSchema)

module.exports = Transaction