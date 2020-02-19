const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const {encrypt} = require('../helpers/encrypt')

let modelSchema = new Schema({
    email : {
        type:String,
        unique:true
    },
    password: String,
    name : String,
    cart : [{
        product : { type: Schema.Types.ObjectId, ref: 'Product' },
        amount : Number
    }]
})
modelSchema.pre('save', function(){
    this.password = encrypt(this.password)
})

var realModel = mongoose.model('User', modelSchema)
module.exports = realModel