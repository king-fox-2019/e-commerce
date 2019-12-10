const ProductModel = require('./product')
const mongoose = require('mongoose')
const { Schema, model  } = mongoose
const CartSchema = new Schema({
    productId : {
        type : Schema.Types.ObjectId,
        ref : 'Product',
        required: [true, 'product is required'],
    },
    quantities : {
        type : Number,
        required: [true, 'quantities is required'],
        validate : {
            validator : function(val) {
                return val <= 0 ? false : true
            },
            message : props => `quantities less than 1!`
        }
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    price : {
        type : Number
    },
    status :{
        type : String,
        enum: ['oncart', 'process', 'complete'],
        default : 'oncart',
    }
},{
    versionKey: false,
    timestamps: true
})

CartSchema.pre('save',function(next){
    ProductModel.findOne({ _id : this.productId })
        .then(product=>{
            if (product.quantities < this.quantities) {
                next({
                    status : 400,
                    message : 'sorry quantities is more than product quantities!'
                })
            } else {
                this.price = product.price * this.quantities
                next()
            }
        })
        .catch(next)
})

CartSchema.pre('findOneAndUpdate',async function(next){
    let doc = await this.model.findOne(this.getQuery())
    console.log(doc);
    console.log(this._update);
    if (!this._update.status) {
        next({
            status : 400,
            message : `status is wrong!`
        })
    }  else {
        next()
    }
})

module.exports = model('Cart',CartSchema)