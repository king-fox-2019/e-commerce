const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type:String,
        required:[true,"name required"]
    },
    price:{
        type:Number,
        required:[true,"price required"]
    },
    stock:{
        type:Number,
        required:[true,"stock required"]
    },
    image:{
        type:String,
        required:[true,"image required"]
    }
})

// productSchema.pre('updateOne',function(next){
//     if(!this.name||!this.price||!this.stock||!this.image) next({name:'400',message:'please input all the field'})
//     else next()
// })

const Product = mongoose.model('Product',productSchema)

module.exports = Product