const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const StockSchema = new Schema ({
   productId : {
       type : Schema.Types.ObjectId,
       ref : 'Product'
   },
   number : {
       type : String,
       required : [true, 'size number is required']
   },
   stock: {
       type : Number,
       required : [true,'stock is required']
   }
})

  StockSchema.pre('validate', function(next){
    return Stock.findOne({ number: this.number, productId: this.productId})
      .then(result => {
        if(result){
          next({
            status: 400,
            message : "Number already exist"
          })
        }else {
          next()
        }
      })
  })

  
const Stock = mongoose.model('Stock',StockSchema)

module.exports = Stock