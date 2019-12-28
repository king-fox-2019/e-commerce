const chai = require('chai')
const app = require('../app')
const chaiHttp = require('chai-http')
const User = require('../models/user')
const Product = require('../models/product')

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

let adminLogin = {
    email: adminRole.email,
    password: adminRole.password
}

let customerLogin = {
    email: customerRole.email,
    password: customerRole.password
}

let initialProduct = {
    name: 'Brewista - X SERIES Hand Grinder - Black (BX002)',
    image: 'https://s-ecom.ottenstatic.com/original/5dc53c99ccebd346757884.jpg',
    price: 800000,
    desc: 'This is description of product',
    stock: 10,
    category: 'basic'
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
        .send(adminLogin)
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
            
            it('should return error authentication with status code 401 caused the token is not valid', function(done){
                chai.request(app)
                .post('/product')
                .set('access_token', 'randomToken')
                .send(initialProduct)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message).to.equal('jwt malformed')
                    done()
                })
            })
        })
    })

    describe('GET /product', function(){
        describe('success process', function(){
            it('should return array of object of product list and send status code 200', function(done){
                chai.request(app)
                .get('/product')
                .set('access_token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
            })
        })
    })


    let productId = ''

    before(function(done){
        Product.create(initialProduct)
            .then( product =>{
                productId = product._id
                done()
            })
            .catch(console.log)
    })

    describe('GET /product/:id', function(){

        describe('success process', function(){
            it('should return object of product and send status code 200', function(done){
                chai.request(app)
                .get(`/product/${productId}`)
                .set('access_token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('name', 'image', 'desc', 'price', 'stock', 'category')
                    done()
                })
            })
        })

        describe('error process', function(done){
            it('should return error with status code 401 caused failed pass authenticate process', function(done){
                chai.request(app)
                .get(`/product/${productId}`)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message).to.equal('jwt must be provided')
                    done()
                })
            })

            it('should return error authentication with status code 401 caused the token is not valid', function(done){
                chai.request(app)
                .get(`/product/${productId}`)
                .set('access_token', 'randomToken')
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message).to.equal('jwt malformed')
                    done()
                })
            })

            it('should return error with status code 404 caused cannot find the product with given id', function(done){
                chai.request(app)
                .get('/product/123456733344')
                .set('access_token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message).to.equal('There is no product with that id')
                    done()
                })
            })
        })
    })


    describe('PUT /product/:id', function(){

        let custToken = ''

        before(function(done){
            chai.request(app)
            .post('/user/login')
            .send(customerLogin)
            .end(function(err,res){
                custToken = res.body.token
                done()
            })  
        })

        describe('success process', function(){
            it('should return new object product and status code 200', function(done){
                const data = { name: 'Ini dirubah dengan product' }
                chai.request(app)
                .put(`/product/${productId}`)
                .set('access_token', token)
                .send(data)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.equal(data.name)
                    done()
                })
            })
        })

        describe('error process', function(){
            it('should return error with status code 401 caused failed to pass authorization', function(done){
                let data = { name: 'Ini coba dirubah sama customer'}
                chai.request(app)
                .put(`/product/${productId}`)
                .set('access_token', custToken)
                .send(data)
                .end(function(err,res){
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message).to.equal('You dont have authorization to do action')
                    done()
                })
            })

            it('should return error with status code 401 caused failed pass authenticate, dont set any headers in client', function(done){
                let data = { name: 'ini dirubah ya' }
                chai.request(app)
                .put(`/product/${productId}`)
                .send(data)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message).to.equal('jwt must be provided')
                    done()
                })
            })

            it('should return error with status code 401 caused failed oass authenticate, token not valid from client', function(done){
                let data = { name: 'ini dirubah ya' }
                chai.request(app)
                .put(`/product/${productId}`)
                .set('access_token', 'randomToken')
                .send(data)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message).to.equal('jwt malformed')
                    done()
                })
            })

            it('should return error with status code 404 caused cannot find product with given id', function(done){
                let data = { name: 'has been changed' }
                chai.request(app)
                .put(`/product/123456789`)
                .set('access_token', token)
                .send(data)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    done()
                })
            })
        })
    })

    describe('DELETE /product/:id', function(){

        let custToken = ''

        before(function(done){
            chai.request(app)
            .post('/user/login')
            .send(customerLogin)
            .end(function(err,res){
                custToken = res.body.token
                done()
            })  
        })

        describe('success process', function(){
            it('should return status 200 with message delete product success!', function(done){
                chai.request(app)
                .delete(`/product/${productId}`)
                .set('access_token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message).to.equal('Delete Product Success!')
                    done()
                })
            })
        })

        describe('error process', function(){
            it('should return error with status code 401 caused failed pass the authorization', function(done){
                chai.request(app)
                .delete(`/product/${productId}`)
                .set('access_token', custToken)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message).to.equal('You dont have authorization to do action')
                    done()
                })
            })

            it('should return error with status code 401 caused failed pass the authentication', function(done){
                chai.request(app)
                .delete(`/product/${productId}`)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message).to.equal('jwt must be provided')
                    done()
                })
            })

            it('should return error with status code 401 caused given token not valid', function(done){
                chai.request(app)
                .delete(`/product/${productId}`)
                .set('access_token', 'randomToken')
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message).to.equal('jwt malformed')
                    done()
                })
            })

            it('should return error with status code 404 caused cannot find any items with given params', function(done){
                chai.request(app)
                .delete(`/product/123456789`)
                .set('access_token', token)
                .end(function(err,res){
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object').to.have.any.keys('code', 'message')
                    expect(res.body.message).to.equal('Cast to ObjectId failed for value "123456789" at path "_id" for model "Product"')
                    done()
                })
            })
        })
    })
})