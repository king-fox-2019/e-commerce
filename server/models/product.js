const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: String,
    image: String,
    price: String,
    description: String,
    quantity: Number,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

ProductSchema.pre('save', function(next){
    this.price = this.price + ' rupiah'
    next()
})

const Product = mongoose.model('Product', ProductSchema)