const Cart = require('../models/Cart')

module.exports= (req,res,next)=>{
    console.log('CART EXISTING CHECK IS RUNNING')
    Cart.findOne(
        { _id:req.query.id}
    )
    .then(result=>{
        if (result)
          next()
        else
          throw({ code:403, message:'cart not found'})
    })
    .catch(err=>{
        next(err)
    })





}