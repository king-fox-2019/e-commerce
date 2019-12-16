const mongoose = require('mongoose')
const { Schema, model  } = mongoose
const Product = require('./product')
const ProductSchema = new Schema({
    name : {
        type : String,
        required: [true, 'name is required'],
        unique: [true, 'name already in use']
    },
    size: [{
        type : Schema.Types.ObjectId,
        ref : 'Stock'
    }],
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    discount : {
        type : Number,
        default : -1,
        validate : {
            validator : function(val) {
                return val < -1 ? false : true
            },
            message: props => `discount is 0% s/d 100%`
        }
    },
    image : {
        type : Array,
        validate : {
            validator : function(val) {
                console.log(val);
                return val.length == 0 ? false : true  
            },
            message: props => `image is required!`
        }
    }
},{
    versionKey: false,
    timestamps: true
})

// ProductSchema.pre('findOneAndUpdate',async function(next){
//     let doc = await this.model.findOne(this.getQuery())
//     if(this._update.discount < -1){
//         next({
//             status : 400,
//             message : `discount is 0% s/d 100%`
//         })
//     } else if (this._update.discount == -1) {
//         this._update.discount = -1
//         next()
//     } else {

//         if(this._update.price){
//             next()
//         } else {
//             let discount = doc.price * this._update.discount / 100
//             this._update.discount = doc.price - discount
//             next()
//         }
//     }
// })

module.exports = model('Product',ProductSchema)