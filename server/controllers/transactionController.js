const Transaction = require ('../models/transactions')
const Stock = require('../models/stock')
const rajaOngkirAPI = require('../api/axios')
const nodemailer = require("nodemailer");

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

   static confirmReceived(req,res,next){
        Transaction.findOneAndUpdate({_id : req.params.transactionId},{
            receive_status : true
        })
            .then(data => {
                res.status(201).json({message : 'Confirmation Received'})
            })
            .catch(err => {
                next(err)
            })
   }

   static checkOut(req,res,next){
       let address = `${req.body.street}, ${req.body.city}, ${req.body.province}, ${req.body.postalCode}`
       Transaction.find({
           User_id : req.loggedUser.id,
           payment_status : false
        })
        .then(transactions => {
            // console.log('triggered?',req.loggedUser.id)
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
        // console.log('get cart?')
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
            .populate({
                path : "Stock_id",
                populate :{
                    path : "productId",
                }
            })
                .then(transaction => {
                    res.status(200).json(transaction)
                })
                .catch(next)
        }

    static deleteTransaction(req,res,next){
        // console.log(req.params)
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
    
    static emailConfirmation(req,res,next){
        let emailCustomer = ''
        let confirmationLink  = `http://localhost:3000/transactions/confirm/${req.body.transactionId}`
        Transaction.findById(req.body.transactionId)
        .populate('User_id')
        .populate({
            path : "Stock_id",
            populate :{
                path : "productId",
            }
        })
        .then(transaction => {
            // let date = transaction.date.slice(0,10)
            emailCustomer = transaction.User_id.email
            // console.log(transaction.date.toString().slice(0,10) + ', '+ transaction.date.getFullYear())
            // console.log(transaction.date.getDate())
            // console.log(transaction.date.getMonth())
            // console.log(transaction.date.getFullYear())
            let transporter = nodemailer.createTransport({
              service: 'gmail',
            
              auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD // generated ethereal password
              }
            });
    
            let mailOptions = {
                from: process.env.EMAIL, // sender address
                to: emailCustomer, // list of receivers
                subject: "Nike Store - Order Confirmation", // Subject line
                text: "Have you received your item?", // plain text body
                html: `<html>
                        <head>
                        <style>
                        body {
                        color:#353535;
                        }
                        .container {
                        font-family: 'Helvetica Neue', Helvetica;
                        text-align: center;
                        padding: 5px; 
                        }
                        .text-container{
                        width: 90%;
                        max-width: 800px;
                        font-weight: 300;
                        margin: 0 auto;
                        padding: 15px;
                        padding-bottom: 15px;
                        }
                        h1{
                        font-weight: 100;
                        }
                            a{
                            text-decoration: none;
                            color: none;
                            }
                        .button {
                        padding: 15px;
                        font-family: 'Helvetica Neue', Helvetica;
                        text-size: 18px;
                        color: white;
                        background-color: #353535;
                        border: 0;
                        border-radius: 5px;
                        margin: 10px;
                        display: block;
                        max-width: 200px;
                        margin: auto;
                        text-decoration: none;
                        }
                        p {
                        line-height: 1.5;
                        margin:0px;
                        }
                        html {
                        width: 100%;
                        }
                        body {
                        background: #f5f5f5;
                        margin: 50px auto;
                        width: 512px;
                        }
                        .mdl-card + .mdl-card {
                        margin-top: 40px;
                        }
                        
                        // Card styles
                        
                        .mdl-card--horizontal {
                        flex-direction: column;
                        height: 1vh; /* 1 */
                        padding-left: 150px;
                        width: 100%;
                        
                        .mdl-card__media {
                            left: 0;
                            position: absolute;
                            width: 150px;
                        }
                        
                        .mdl-card__supporting-text {
                            flex: 1 1 auto;
                            width: auto;
                        }
                        }
                        
                        .mdl-card--horizontal-2 {
                        flex-direction: row;
                        flex-wrap: wrap;
                        min-height: 0px;
                        
                        .mdl-card__title {
                            align-items: flex-start;
                            flex-direction: column;
                            flex: 1 auto;
                            float: left;
                        }
                        .mdl-card__title-text {
                            align-self: flex-start;
                        }
                        .mdl-card__media {
                            flex: 0 auto; 
                            float: right;
                            height: 112px;
                            margin: 16px 16px 0 0;
                            width: 112px;
                        }
                        .mdl-card__actions {
                            clear: both;
                            flex: 1 auto; 
                        }
                        }
                        </style>
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
                        </head>
                        <body>
                            <div class="container" id="mobile">
                            <div class= "text-container">
                                <div>
                                <img src="https://storage.googleapis.com/nike-public-bucket/nike%20logo%20square.png" alt="Smiley face" width="100" height="100">
                                </div>
                            <h1><i class="fa fa-check-circle" aria-hidden="true" style="color: #353535;"></i> Order Confirmation</h1>
                                
                                <div class="mdl-card mdl-shadow--2dp mdl-card--horizontal" style="display:flex;box-shadow: 10px 10px 37px -11px rgba(0,0,0,0.22);">
                        <div class="mdl-card__media">
                            <img src="${transaction.Stock_id.productId.images[1]}" width="200" height="200" alt="img">
                        </div>
                            <div class="mdl-card__title" style="text-align:left;margin-left:20px">
                            <h2 class="mdl-card__title-text">${transaction.Stock_id.productId.name}</h2>
                            <p>Receiver : ${transaction.receiver}</p>
                            <p>Address : ${transaction.address} </p>
                            <p>Total Payment : ${transaction.total_payment}</p>
                            <p>Date purchased : ${transaction.date.toString().slice(0,10) + ', '+ transaction.date.getFullYear()}</p>
                            </div> 
                                </div> 
                                <br>
                                <p>Click button below to confirm <span id="count"></span>.</p>
                                <br>
                                <a href="${confirmationLink}" class= "button">Confirm Now</a>
                            </div>
                            </div>
                            <hr style="width:70px">
                            <div class="container" style="margin-top:-20px" id="web">
                            <div class= "text-container">
                                <p>Thank you for shopping with us.</p>
                                <p>Follow our social media for more deals on <br /><span style="font-size: 2em;"><a href="https://www.instagram.com/nike/" alt="Instagram"><i class="fa fa-instagram" aria-hidden="true" style="color: #353535;"></i></a> <a href="https://twitter.com/Nike" alt="Twitter"><i class="fa fa-twitter-square" aria-hidden="true" style="color: #353535;"></i></a> <a href="https://web.facebook.com/nike/" alt="facebook"><i class="fa fa-facebook-official" aria-hidden="true" style="color: #353535;"></i></a></span> </p>
                            </div>
                            </div>
                        </body>
                        </html>` // html body
              }
            
           return transporter.sendMail(mailOptions, function(err,data){
               if(err){
                   next(err)
               }else{
                //    return 'email s
                   console.log('email sent!')
            }
            return main().catch(console.error);
        })
        .then(success => {
            res.status(201).json({message : 'email sent'})
            })
        })
        .catch(err => {
            next(err)
        })
        // console.log(req.loggedUser)
    }
}

module.exports = TransactionController