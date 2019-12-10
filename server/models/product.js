const mongoose = require('mongoose')
const { Schema, model  } = mongoose
const ProductSchema = new Schema({
    name : {
        type : String,
        required: [true, 'name is required'],
    },
    price : {
        type : Number,
        required: [true, 'price is required'],
        validate : {
            validator : function(val) {
                return val < 0 ? false : true 
            },
            message: props => `price is under 0`
        }
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
    },
    quantities : {
        type : Number,
        default: 0,
        validate : {
            validator : function(val) {
                return val < 0 ? false : true
            },
            message: props => `quantities is under 0`
        }
    },
    tag : {
        type : Array,
        validate : {
            validator : function(val) {
                return val.length == 0 ? false : true 
            },
            message: props => `tag is required!`
        }
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    versionKey: false,
    timestamps: true
})

ProductSchema.pre('findOneAndUpdate',async function(next){
    let doc = await this.model.findOne(this.getQuery())
    if(this._update.discount < -1){
        next({
            status : 400,
            message : `discount is 0% s/d 100%`
        })
    } else if (this._update.discount == -1) {
        this._update.discount = -1
        next()
    } else {

        if(this._update.price){
            next()
        } else {
            let discount = doc.price * this._update.discount / 100
            this._update.discount = doc.price - discount
            next()
        }
    }
})

module.exports = model('Product',ProductSchema)