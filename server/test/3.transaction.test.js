const chai = require('chai')
const app = require('../app')
const chaiHttp = require('chai-http')
const User = require('../models/user')

chai.use(chaiHttp)
const expect = chai.expect


let adminRole = {
    username: 'sasuke',
    email: 'sasuke@gmail.com',
    password: 'sasuke123',
    role: 'admin',
    address: 'Jalan Iskandar Muda No 2, Jakarta Selatan'
}

let customerRole = {
    username: 'Sakura',
    email: 'sakura@gmail.com',
    password: 'sakura123',
    role: 'customer',
    address: 'Jalan Haji Leman No 51, Jakarta Selatan'
}

let initialProduct = {
    name: 'Brewista - X SERIES Hand Grinder - Black (BX002)',
    image: 'https://s-ecom.ottenstatic.com/original/5dc53c99ccebd346757884.jpg',
    price: 800000,
    desc: 'This is description of product',
    stock: 10,
    category: 'basic'
}

// initial admin create
before(function(done){
    User.create(adminRole)
        .then( adminUser =>{
            return User.create(customerRole)
        })
        .then( customerUser =>{
            return 
            console.log('testing : => Initialize create user admin and customer success')
            done()
        })
        .catch(console.log)
})

after(function(done){
    User.deleteMany({})
        .then(_=>{
            console.log('testing: => delete all user after testing success')
            done()
        })
})


describe('Cart Routes', function(){

    describe('POST /cart', function(){

        describe('success process', function(){
            it.only('should return an object cart and status code 201', function(done){
                chai.request(app)
                .post('/cart')
                .set('access_token', customerToken)
                .send(initialCart)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('productId','amount','price', 'UserId')
                    done()
                })
            })
        })
    })
})