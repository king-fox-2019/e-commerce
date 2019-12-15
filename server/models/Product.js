const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let modelSchema = new Schema({
    name : String,
    price : Number,
    description : String,
    image : String,
    stock : Number
})

var realModel = mongoose.model('Product', modelSchema)
module.exports = realModel