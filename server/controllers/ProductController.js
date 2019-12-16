const Product = require("../models/product");

class ProductController{
    static findAll (req, res, next) {
        console.log('findAll');

        Product.find()
            .then(( products ) => {
                console.log('products => ',products);
                res.status(200).json(products);
            })
            .catch(next)
    }
    
    static create(req, res, next) {
        console.log('create')

        let body = {
            name: req.body.name,
            image: req.file ? req.file.cloudStoragePublicUrl : null,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(body)
            .then(result => {
                console.log('result => ',result);
                res.status(201).json(result);
            })
            .catch(next)
    }

    static delete(req, res, next) {
        console.log('delete');
        let id = req.params.productId;

        Product.findByIdAndDelete(id)
            .then(( result ) => {
                if(result){
                    console.log('result => ',result);
                    res.status(200).json({
                        message: "Successfully delete the product"
                    })
                } else { 
                    throw new Error("Product id not found")
                }
                
            })
            .catch(next)
    }
    static update(req, res, next){
        console.log('update');

        let updateVal = {}
        let id = req.params.productId;

        req.body.name && (updateVal.name = req.body.name);
        req.body.price && (updateVal.price = req.body.price);
        req.body.stock && (updateVal.stock = req.body.stock);

        if(req.file !== undefined){
            updateVal.image = req.file.cloudStoragePublicUrl
        }

        Product.findByIdAndUpdate(id,updateVal,{new:true})
            .then(( result ) => {
                console.log('result => ',result);
                res.status(200).json(result);
            })
            .catch(next)
    }
}

module.exports = ProductController