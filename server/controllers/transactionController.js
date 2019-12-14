const Transaction = require ('../models/transactions')
const Stock = require('../models/stock')
const rajaOngkirAPI = require('../api/axios')

class TransactionController {

   static getAllTransaction(req,res,next){
    Transaction.find()
        .populate('User_id')
        .populate({
            path : "Stock_id",
            populate :{
                path : "productId",
            }
        })
        .then(transactions => {
            res.status(200).json(transactions)
        })
        .catch(err => {
            next(err)
        })
   }
   static addToCart(req,res,next){
       Stock.findOne({
           productId : req.params.id,
           number : req.body.size
        })
        
        .populate('productId')
        .then(stock => {
                
                if(!stock){
                    res.status(404).json({message : 'product not found'})
                }else{
                    if(stock.stock >= req.body.count && req.body.count != 0){
                        let cart = {
                            Stock_id : stock._id,
                            User_id : req.loggedUser.id,
                            count : req.body.count,
                            total_payment :(req.body.count * stock.productId.price),
                        }
                        Transaction.create(cart)
                        .then(cart => {
                                
                                res.status(201).json({cart:cart, stock:stock})
                            })
                            .catch(err => {
                                next(err)
                            })
                    }else{
                        next({
                            status : 400,
                            message : 'stock is not enough'
                        })
                }
            }
        })
   }

   static checkOut(req,res,next){
       let address = `${req.body.street}, ${req.body.city}, ${req.body.province}, ${req.body.postalCode}`
       Transaction.find({
           User_id : req.loggedUser.id,
           payment_status : false
        })
        .then(transactions => {
            console.log('triggered?',req.loggedUser.id)
            transactions.forEach(transaction => {
                let updatedStock = null
                let totalBuy = transaction.count
                Stock.findOne({_id : transaction.Stock_id})
                    .then(stock => {
                        updatedStock = stock.stock - totalBuy
                        return Stock.findOneAndUpdate({_id:stock._id},{stock : updatedStock})
                    })
                    .then( stock => {
                        return Transaction.findOneAndUpdate({ _id : transaction._id},{
                            payment_status : true,
                            address : address,
                            receiver : req.body.receiver,
                        },{new :true})
                    })
                    .then( transactions => {
                        res.status(200).json(transactions)
                    })
                })
            })
        .catch (err => {
            next(err)
        })
    }

    static finishedTransaction(req,res,next){
        Transaction.find({
            received_status : true,
            User_id : req.loggedUser.id
        })
        .populate('ProductId')
            .then(transaction => {
                res.status(200).json(transaction)
            })
            .catch(next)
    }

    static cart(req,res,next){
        console.log('get cart?')
        Transaction.find({
            payment_status : false,
            User_id : req.loggedUser.id
        })
        .populate({
            path : 'Stock_id',
            populate: {
                path:'productId'
            }
        })
            .then(transaction => {
                res.status(200).json(transaction)
            })
            .catch(next)
    }

    static showTransaction(req,res,next){
        Transaction.find({
                User_id : req.loggedUser.id
            })
            .populate('User_id')
            .populate('Stock_id')
                .then(transaction => {
                    res.status(200).json(transaction)
                })
                .catch(next)
        }

    static deleteTransaction(req,res,next){
        console.log(req.params)
        Transaction.findByIdAndDelete(req.params.id)
            .then(transaction => {
                res.status(201).json({message : 'transaction successfully deleted'})
            })
            .catch(err => {
                next(err)
            })
    }

    static getCities(req,res,next){

        rajaOngkirAPI({
            method : 'get',
            url : 'province',
        })
            .then(({data}) => {
                let cities = data.rajaongkir.results
                res.status(200).json(cities)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static getCityInProvince(req,res,next){
        // console.log(req.body.province)
        rajaOngkirAPI({
            method : 'get',
            url : 'city',
        })
            .then(({data}) => {
                let cities = data.rajaongkir.results
                
                var filteredCity =  cities.filter(function(city) {
                        return city.province == req.body.province;
                    });
                res.status(200).json(filteredCity)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static getCityId(req,res,next){
        // console.log(req.body.province)
        rajaOngkirAPI({
            method : 'get',
            url : 'city',
        })
            .then(({data}) => {
                let cities = data.rajaongkir.results
                var filtered =  cities.filter(function(city) {
                    return city.city_name == req.body.city;
                });
                return filtered[0].city_id
            })
            .then(destinationId => {
                // res.status(200).json(destinationId)
                console.log(destinationId,'from destinationid')

                rajaOngkirAPI({
                    method : 'post',
                    url : 'cost',
                    data : {
                        origin : '501' ,
                        destination : destinationId,
                        weight: req.body.weight,
                        courier: 'tiki'
                    }
                })
                .then(({data}) => {
                    res.status(200).json(data.rajaongkir.results)
                })
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
}

module.exports = TransactionController