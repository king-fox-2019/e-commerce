const mongoose = require('mongoose')
const { Schema, model  } = mongoose
const StockSchema = new Schema({
    size: {
        type: Number,
        required: [true, 'Size is required'],
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        validate : {
            validator : function(val) {
                return val < 0 ? false : true
            },
            message: props => `stock is under 0`
        }
    },
    sold: {
        type: Number,
        default: 0
    }
},{
    versionKey: false,
    timestamps: true
})

module.exports = model('Stock', StockSchema)