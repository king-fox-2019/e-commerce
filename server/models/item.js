const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const ItemSchema = new Schema({
    name: {
        type:String,
        required:[true,'you must enter your name']
    },
    price: {
        type:Number,
        required:[true,'you must enter your price']
    },
    stock: {
        type:Number,
        required:[true,'you must enter your stock']
    },
    image:{
        type:String,
        required:[true,'you must enter your image']
    },
});

const Model = mongoose.model('Item', ItemSchema)
module.exports = Model