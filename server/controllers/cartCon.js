const { Cart, User, Item, Transaction } = require('../models')
const axios = require('axios')

class CartController {

    static apiCity(req, res, next) {
        axios({
            method: 'GET',
            url: 'https://api.rajaongkir.com/starter/city',
            headers: {
                key: process.env.KEY
            }
        })
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static ongkir(req, res, next) {
        axios({
            method: 'POST',
            url: 'https://api.rajaongkir.com/starter/cost',
            headers: {
                key: process.env.KEY
            },
            data: {
                origin: `23`,
                destination: req.params.cityCode,
                weight: 1000,
                courier: 'jne'
            }
        })
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req, res, next) {
        const itemId = req.params.id
        const qty = Number(req.body.qty)
        let subPrice, itemPrice
        //qty validation
        Item.findById(itemId)
            .then(item => {
                if (!item) throw ({message: 'data not found'})
                if (item.stock < qty) throw ({message: 'stock less than qty'})
                //cek apakah barangnya sudah ada di cart
                itemPrice = item.price
                return Cart.findOne({userId: req.loggedUser.id, itemId, status: 'pending'})
            })
            .then(cart => {
                console.log(cart)
                //jika card nya ada, maka update quantity dan subPricenya
                if (cart && cart.status == 'pending') {
                    let newQty = cart.qty + 1
                    subPrice = itemPrice * newQty
                    return Cart.findByIdAndUpdate(cart._id, {qty: newQty, subPrice}, {new: true})
                } else {
                    subPrice = itemPrice * qty
                    return Cart.create({
                       userId: req.loggedUser.id,
                       itemId,
                       qty,
                       subPrice 
                    })
                }
            })
            .then(newCart => {
                res.status(201).json({newCart, message: 'succes add product to cart'})
            }).catch(next)
    }

    static showAll(req, res, next) { //admin only
        Cart.find( {$or: [{status: 'checkout'},{status: 'delivered'}]} )
            .populate('itemId')
            .populate('userId')
            .exec(function (err, carts) {
                // callback
                if (err) next()
                else res.status(200).json({carts})
           });
            // .then(carts => {
            //     console.log(carts)
            //     res.status(200).json({carts})
            // }).catch(next)
    }

    static showAllUserCart(req, res, next) {
        Cart.find({userId: req.loggedUser.id})
            .populate('itemId')
            .then(carts => {
                res.status(200).json({carts})
            }).catch(next)
    }

    static showAllHistoryUserCart(req, res, next) {
        Cart.find({userId: req.loggedUser.id, $or: [{status: 'checkout'},{status: 'delivered'}] })
            .populate('itemId')
            .then(carts => {
                res.status(200).json({carts})
            }).catch(next)
    }

    static showAllPendingUserCart(req, res, next) {
        Cart.find({userId: req.loggedUser.id, status: 'pending'})
            .populate('itemId')
            .then(carts => {
                res.status(200).json({carts})
            }).catch(next)
    }

    static finishing(req, res, next) { //untuk konfirmasi user barang sudah diterima
        const { id } = req.params
        const update = {}
        for (let key in req.body) {
            update[key] = req.body[key]
        }
        Cart.findByIdAndUpdate(id, update)
        .then(cart => {
            if (!cart) throw ({message: 'data not found'})
            res.status(200).json({message: 'deliver success'})
        }).catch(next)     
    }

    static update(req, res, next) {
        const { id } = req.params
        const update = {}
        let qtyCheckout
        //ongkir dimasukin di client req.body.ongkir
        for (let key in req.body) {
            update[key] = req.body[key]
        }
        if (update.status) { //untuk update status dari pending menjadi checkout
            Cart.findById(id)
                .then(cart => {
                    if (!cart) throw ({message: 'data not found'})
                    qtyCheckout = cart.qty
                    return Item.findById(cart.itemId)
                })
                .then(item => {
                    if (item.stock - qtyCheckout < 0) throw ({message: 'current stock less than qty'})
                    let newQty = item.stock - qtyCheckout 
                    // let newPrice = item.subPrice + ongkir
                    return Item.findByIdAndUpdate(item._id, { stock: newQty}, {new: true})
                })
                .then(item => {
                    return Cart.findByIdAndUpdate(id, update, {new: true})
                })
                .then(cart => {
                    res.status(200).json({message: 'checkout success'})
                }).catch(next)     
        } else if (update.qty) { //untuk update qty
            Cart.findById(id)
                .then(cart => {
                    if (!cart) throw ({message: 'data not found'})
                    return Item.findById(cart.itemId)
                })
                .then(item => {
                    if (item.stock < update.qty) throw ({message: 'stock less than qty'})
                    const subPrice = item.price * update.qty
                    update.subPrice = subPrice
                    return Cart.findByIdAndUpdate(id, update)
                })
                .then(cart => {
                    res.status(200).json({message: 'success update cart'})
                }).catch(next) 
        }
    }

    static delete(req, res, next) {
        const { id } = req.params
        Cart.findByIdAndDelete(id)
            .then(cart => {
                if (!cart) throw ({message: 'data not found'})
                res.status(200).json({cart, message: 'success delete cart'})
            }).catch(next)
    }
}

module.exports = CartController