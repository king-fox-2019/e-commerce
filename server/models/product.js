const { Schema,model } = require('mongoose')

const productSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Product name cannot be empty']
    },
    image:{
        type: String,
        required: [true, 'Image product cannot be empty'],
        default: 'https://crowdsourcer.io/assets/images/no-img.png'
    },
    desc:{
        type: String
    },
    price:{
        type: Number,
        min: [0, 'Price cannot have negative value'],
        default: 0
    },
    stock:{
        type: Number,
        min: [0, 'Stock cannot be negative value'],
        default: 0
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category:{
        type: String,
        enum: ['basic', 'attack', 'defense']
    }
},
{
    versionKey: false,
    timestamps: true
})

const Product = model('Product', productSchema)

module.exports = Product