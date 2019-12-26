const Product = require('../models/Product')

module.exports = (req,res,next)=>{
    console.log('PRODUCT STOCK CHECKING UPDATE IS RUNNING');
    
    const { ProductId, transactionType } = req.body
    const processedQuantity = Number(req.body.processedQuantity)
    // transactionType = enum[ 'return' / 'purchase' ]
    // nanti di client bikin logic, supaya kalo client update quantity barang menjadi lebh kecil = return,
    // kalo jadi lebih banyak = purchase
    // MASUKIN DALAM REQBODY. PROCESSED QUANTITY, TERMASUK WAKTU PERTAMA KALI BELI / UPDATE / PUT

    console.log('TCL \n============\n ', req.body)
    Product.findOne(
        { _id:ProductId }
    )
    .then(result =>{
    console.log("TCL: result", result)
        if(transactionType === 'purchase' )
          {
            if ( result.quantity - processedQuantity < 0)
              {
                throw({ code: 400, message: 'Not allowed to buy more than available quantity'})
              }
            else 
              { 
                req.quantityUpdate = result.quantity - processedQuantity
              }
          }
        else if(transactionType === 'return')
          {
            req.quantityUpdate = result.quantity + processedQuantity
          }
        else
          {
            throw {code:400, message:'invalid transaction type'}
          }
        return
    })
    .then( ()=>{
       return Product.update(
            { _id: ProductId},
            { quantity: req.quantityUpdate}
        )
    })
    .then(result=>{
            next()        
        })
    .catch(err=>{
        next(err)
    })



}