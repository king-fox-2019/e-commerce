const chai  = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app.js')
const userModel = require('../models/user')
const cartModel = require('../models/cart')
const productModel = require('../models/product')
const expect = chai.expect
const fs = require('fs')

chai.use(chaiHttp)

const userLogin = {
    email : 'anggabanny@admin.com',
    password : '123456'
}

const userLoginMember = {
    email : 'anggabanny@member.com',
    password : '123456'
}

after(function(done){
    userModel.deleteMany({})
        .then(_ => {
            console.log('testing: delete user after testing success!')
            return productModel.deleteMany({}) 
        })
        .then(_=>{
            console.log('testing: delete product after testing success!')
            return cartModel.deleteMany({}) 
        })
        .then(_=>{
            console.log('testing: delete cart after testing success!')
            done()
        })
        .catch(console.log)
})

// // process validation with mochajs
describe('CART Routes',function(){
    describe('/cart',function(){
        let token;
        before(function(done){
            chai.request(app)
            .post('/user/login')
            .send(userLogin)
            .end(function(err,res){
                token = res.body.token
                done()
            })
        })
        describe('GET /cart success process',function(){
            // this.timeout(15000);
            it('get cart with 200 status code',function(done){
                // this.timeout(1/5000);
                // setTimeout(done, 15000);
                chai.request(app)
                .get('/cart')
                .set('token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
            })
        }),
        describe('POST /cart success process', function(){
            // this.timeout(15000);
            
            let productId;
            before(function(done){
                chai.request(app)
                .post('/product/create')
                .set('token', token)
                .field('name', 'adidasaaa')
                .field('size', 30)
                .field('price', 800545)
                .field('stock', 90)
                .attach('image', fs.readFileSync("./test/img/FV4687_SL_eCom.jpg"), "FV4687_SL_eCom.jpg")
                .end(function(err,res){
                    productId = res.body.product._id
                    done()
                })
            })
            it('create cart with 201 status code',function(done){
                // this.timeout(1/5000);
                // setTimeout(done, 15000);
                let createCart = {
                    size: 20,
                    quantities: 10,
                    price:20
                }
                chai.request(app)
                .post(`/cart/${productId}/cart`)
                .set('token', token)
                .send(createCart)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.be.an('object').to.have.any.keys('cart', 'message','_id','createdAt', 'price','productId','quantities','size','status','updatedAt','userId')
                    done()
                })
            })
            it('create cart with 400 status code',function(done){
                // this.timeout(1/5000);
                // setTimeout(done, 15000);
                let createCart = {
                    size: 'dwdwd',
                    quantities: 'ddw',
                    price: 'wdwd'
                }
                chai.request(app)
                .post(`/cart/${productId}/cart`)
                .set('token', token)
                .send(createCart)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object')
                    // expect(res.body.message[0]).to.equal('Product name cannot be empty')
                    // expect(res.body).to.be.an('object').to.have.any.keys('cart', 'message','_id','createdAt', 'price','productId','quantities','size','status','updatedAt','userId')
                    done()
                })
            })
            it('create cart with 404 status code without different routes',function(done){
                // this.timeout(1/5000);
                // setTimeout(done, 15000);
                let createCart = {
                    size: 'dwdwd',
                    quantities: 'ddw',
                    price: 'wdwd'
                }
                chai.request(app)
                .post(`/cart/${productId}/cart`)
                .set('token', token)
                .send(createCart)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    done()
                })
            })
        })
        describe('GET /cart/:status success',function(){
            let token;
            before(function(done){
                chai.request(app)
                .post('/user/login')
                .send(userLogin)
                .end(function(err,res){
                    token = res.body.token
                    done()
                })
            })
            it('success 200 status code find cart with status complete',function(done){
                chai.request(app)
                .get('/cart/complete')
                .set('token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.be.an('object').to.have.any.keys('cart', 'message','_id','createdAt', 'price','productId','quantities','size','status','updatedAt','userId')
                    done()
                })
            })
            it('success 200 status code find cart with status oncart',function(done){
                chai.request(app)
                .get('/cart/oncart')
                .set('token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.be.an('object').to.have.any.keys('cart', 'message','_id','createdAt', 'price','productId','quantities','size','status','updatedAt','userId')
                    done()
                })
            })
            it('success 200 status code find cart with status process',function(done){
                chai.request(app)
                .get('/cart/process')
                .set('token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.be.an('object').to.have.any.keys('cart', 'message','_id','createdAt', 'price','productId','quantities','size','status','updatedAt','userId')
                    done()
                })
            })
            it('success 200 status code find cart with status confirm',function(done){
                chai.request(app)
                .get('/cart/confirm')
                .set('token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.be.an('object').to.have.any.keys('cart', 'message','_id','createdAt', 'price','productId','quantities','size','status','updatedAt','userId')
                    done()
                })
            })
            describe('GET /cart/:status error',function(){
                let token;
                before(function(done){
                    chai.request(app)
                    .post('/user/login')
                    .send(userLogin)
                    .end(function(err,res){
                        token = res.body.token
                        done()
                    })
                })
                it('error 400 status code find cart without status',function(done){
                    chai.request(app)
                    .get('/cart/ashiap')
                    .set('token', token)
                    .end(function(err,res){
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body.errors[0]).to.equal('find cart on status ashiap failed!')
                        done()
                    })
                })
            })
        })
    })
})