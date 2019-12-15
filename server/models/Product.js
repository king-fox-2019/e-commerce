const {Schema, model} = require('mongoose')

const productSchema = new Schema ({
  name : {
    type : String,
    required: [true, 'Product name cannot be empty'],
  },
  image : {
    type : Array,
    // validate : {
    //   validator : function(val) {
    //     console.log(val);
    //     return val.length == 0 ? false : true  
    //   },
    //   message: 'Product image is required!'
    // }
  },
  price : {
    type : Number,
    required: [true, 'Price cannot be empty'],
    validate : {
      validator : function(val) {
        return val < 0 ? false : true 
      },
        message: 'Price cannot be negative value'
      }
  },
  stock : {
    type : Number,
    default: 0,
    validate : {
      validator : function(val) {
          return val < 0 ? false : true
      },
      message: 'Stock cannot be negative value'
    }
  },
  userId : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  }
})

const Product = model('Model', productSchema)
module.exports = Product