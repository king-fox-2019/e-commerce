const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let modelSchema = new Schema({
    date : String,
    shopList : [{
        product : { type: Schema.Types.ObjectId, ref: 'Product' },
        amount : Number
    }],
    user :  { type: Schema.Types.ObjectId, ref: 'User' },
    total : Number,
    status : String
})

var realModel = mongoose.model('Transaction', modelSchema)
module.exports = realModel