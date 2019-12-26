const mongoose = require('mongoose')
const Schema = mongoose.Schema


const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    price:{
        type: Number,
        min: 0,
        required: true
    },
    quantity:{
        type: Number,
        min: 0
    },
    createdAt:{
        type: Date,
        required: true
    },
    SellerId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }, 
    imageUrl:{
        type: String
    }

})

const Product = mongoose.model('Product', productSchema)
module.exports = Product