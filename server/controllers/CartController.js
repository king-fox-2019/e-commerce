const Cart = require("../models/cart.js");

class CartController {
    static findAll (req, res, next) {
        console.log('req.body.user => ',req.body.user);
        console.log('req.params.user => ',req.params.user);
        let userId = req.params.user._id
        Cart.find({userId:userId,isCheckout:false}).populate("product")
            .then(( results ) => {
                console.log('results => ',results);
                res.status(200).json(results);
            })
            .catch(next)
    }
    
    static create (req, res, next) {
        console.log('create invoked');
        console.log('req.params.user._id => ',req.params.user._id);
        let body = {
            userId: req.params.user._id,
            product: req.body.product
        }
        Cart.findOne ({ userId: req.params.user._id, product:req.body.product, isCheckout:false })
            .then(( result ) => {
                if(result) {
                    res.status(200).json({
                        message:"Already exist in user cart"
                    })
                } else {
                    return Cart.create(body)
                }
            })
            .then(( result ) => {
                res.status(201).json(result);
            })
            .catch(next)
    }

    static delete (req, res, next) {
        let id = req.params.cartId;

        Cart.findByIdAndDelete(id)
            .then(( result ) => {
                if(result){
                    res.status(200).json({
                        message:"Successfully delete the cart"
                    })
                }
            })
            .catch(next)
    }

    static update(req, res, next) {
        let updateVal = {}
        let id = req.params.cartId;
        req.body.isCheckout && (updateVal.isCheckout = req.body.isCheckout);
        req.body.count && (updateVal.count = req.body.count);

        Cart.findByIdAndUpdate(id, updateVal, {new:true})
            .then(result => {
                res.status(200).json(result);
            })
            .catch(next)
    }
}
module.exports = CartController;