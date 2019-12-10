const chai = require('chai')
const app = require('../app')
const chaiHttp = require('chai-http')
const User = require('../models/user')

chai.use(chaiHttp)
const expect = chai.expect

// create user Double
let adminRole = {
    username: 'kirito',
    email: 'kirito@gmail.com',
    password: 'kirito123',
    role: 'admin',
    address: 'Jalan Iskandar Muda No 2, Jakarta Selatan'
}

let customerRole = {
    username: 'Asuna',
    email: 'asuna@gmail.com',
    password: 'asuna123',
    role: 'customer',
    address: 'Jalan Haji Leman No 51, Jakarta Selatan'
}

let userLogin = {
    email: adminRole.email,
    password: adminRole.password
}

let initialProduct = {
    name: 'Brewista - X SERIES Hand Grinder - Black (BX002)',
    image: 'https://s-ecom.ottenstatic.com/original/5dc53c99ccebd346757884.jpg',
    price: 800000,
    stock: 10,
    category: 'equipment'
}

before(function(done){
    User.create(adminRole)
        .then(_ => {
            return User.create(customerRole)
        })
        .then(_=>{
            console.log('testing : => initial create user admin and customer success')
            done()
        })
        .catch(console.log)
})

after(function(done){
    if(process.env.NODE_ENV === 'testing'){
        User.deleteMany({})
            .then(_ =>{
                console.log('testing : => delete database after testing success')
                done()
            })
            .catch(console.log)
    }
})


describe('Product Routes', function(){
    let token = ""
    // inital login
    before(function(done){
        chai.request(app)
        .post('/user/login')
        .send(userLogin)
        .end(function(err,res){
            token = res.body.token
            done()
        })
    })

    describe('POST /product', function(){
        describe('success process', function(){
            it('should return object product and status code 201', function(done){
                chai.request(app)
                .post('/product')
                .set('access_token', token)
                .send(initialProduct)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('name', 'image', 'price', 'stock')
                    done()
                })
            })
        })

        describe('error process', function(){
            it('should return error with status code 400 caused by empty field product name', function(done){
                const withoutName = { ...initialProduct }
                delete withoutName.name
                chai.request(app)
                .post('/product')
                .set('access_token', token)
                .send(withoutName)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message[0]).to.equal('Product name cannot be empty')
                    done()
                })
            })

            it('should return error with status code 400 caused by negative value of price', function(done){
                const negativePrice = { ...initialProduct }
                negativePrice.price = -10
                chai.request(app)
                .post('/product')
                .set('access_token', token)
                .send(negativePrice)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message[0]).to.equal('Price cannot have negative value')
                    done()
                })
            })

            it('should return error with status code 400 caused by negative value of stock', function(done){
                const negativeStock = { ...initialProduct }
                negativeStock.stock = -10
                chai.request(app)
                .post('/product')
                .set('access_token', token)
                .send(negativeStock)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message[0]).to.equal('Stock cannot be negative value')
                    done()
                })
            })

            it('should return error with status code 400 caused by input category from user not include in database', function(done){
                const errorCategory = { ...initialProduct }
                errorCategory.category = 'tools'
                chai.request(app)
                .post('/product')
                .set('access_token', token)
                .send(errorCategory)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message[0]).to.equal('`tools` is not a valid enum value for path `category`.')
                    done()
                })
            })

            it('should return error authentication with status code 401', function(done){
                chai.request(app)
                .post('/product')
                .send(initialProduct)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message).to.equal('jwt must be provided')
                    done()
                })
            })
        })
    })
})