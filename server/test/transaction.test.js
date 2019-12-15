const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const { Item, User, Cart, Transaction } = require('../models')
let tokenAdmin, tokenCustomer, cartId, itemId, customerId, adminId, transactionId
const { generateToken } = require('../helpers/jwt')
const falseId = '5d63b24530a316a809302c57'
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const { readFileSync } = require('fs')

chai.use(chaiHttp)
const expect = chai.expect
const file = readFileSync('./test/test.jpeg')

after(function(done) {
    if (process.env.NODE_ENV === 'testing') {
        Item.deleteMany()
            .then(_ => {
                console.log('testing: delete data item succes!')
                return User.deleteMany()
            })
            .then(_ => {
                console.log('testing: delete data user success!')
                return Cart.deleteMany()
            })
            .then(_ => {
                console.log('testing: delete data cart success!')
                return Transaction.deleteMany()
            })
            .then(_=> {
                console.log('testing: delete data transaction succes!')
                done()
            })
            .catch(console.log)
    } 
})

before(function(done) {
    User.create({
        name: 'admin',
        email: 'admin@admin.com',
        password: '12345678',
        role: 'admin'
    })
        .then((user) => {
            let payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
                }
            adminId = user._id
            tokenAdmin = generateToken(payload)
            return User.create({
                name: 'buyer',
                email: 'buyer@buyer.com',
                password: '12345678',
                role: 'customer'
            })
        })
        .then((user) => {
            let payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
                }
            customerId = user._id
            tokenCustomer = generateToken(payload)
            return Item.create({
                name: 'tea',
                description: 'green tea',
                image: 'url', 
                price: 5000,
                stock: 100
            })
        })
        .then((item) => {
            itemId = item._id
            return Cart.create({
                userId: customerId,
                itemId: itemId,
                qty: 10,
                subPrice: 50000
            })
        })
        .then((cart) => {
            cartId = cart._id
            done()
        })
        .catch(console.log)
})

describe('Cart CRUD', function() {
    this.timeout(1000)
    describe('POST /carts/transaction', function() {
        describe('succes process', function() {
            it('should send an object with 201 status code', function(done) {
                chai.request(app)
                .post(`/click/carts/transaction`)
                .set('token', tokenCustomer)
                .send({
                    items: itemId+',',
                    ongkir: 10000,
                    price: 50000,
                })
                .end(function(err, res) {
                    transactionId = res.body._id
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('itemId','status','_id','userId','ongkir','price','totalPrice','createdAt','updatedAt')
                    expect(res.body.status).to.equal('pending')
                    expect(res.body.itemId).to.be.an('array')
                    expect(res.body.ongkir).to.equal(10000)
                    expect(res.body.price).to.equal(50000)
                    expect(res.body.totalPrice).to.equal(60000)
                    done()
                })
            })
        })
        describe('error process', function() {
            it('should send an error response with status code 400 because missing price value', function(done) {
                chai.request(app)
                .post(`/click/carts/transaction`)
                .set('token', tokenCustomer)
                .send({
                    items: itemId+',',
                    ongkir: 10000,
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('error')
                    expect(res.body.error).to.be.an('array')
                    expect(res.body.error[0]).to.equal('Cast to Number failed for value "NaN" at path "totalPrice"')
                    expect(res.body.error[1]).to.equal('Path `price` is required.')
                    done()
                })
            })
            it('should send an error response with status code 400 because missing ongkir value', function(done) {
                chai.request(app)
                .post(`/click/carts/transaction`)
                .set('token', tokenCustomer)
                .send({
                    items: itemId+',',
                    price: 50000,
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('error')
                    expect(res.body.error).to.be.an('array')
                    expect(res.body.error[0]).to.equal('Cast to Number failed for value "NaN" at path "totalPrice"')
                    expect(res.body.error[1]).to.equal('Path `ongkir` is required.')
                    done()
                })
            })
            it('should send an error response with status code 400 because missing token', function(done) {
                chai.request(app)
                .post(`/click/carts/transaction`)
                .send({
                    items: itemId+',',
                    price: 50000,
                    ongkir: 10000
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('error')
                    expect(res.body.error).to.be.an('array')
                    expect(res.body.error[0]).to.equal('login first')
                    done()
                })
            })
            it('should send an error response with status code 400 because invalid token', function(done) {
                chai.request(app)
                .post(`/click/carts/transaction`)
                .set('token', invalidToken)
                .send({
                    items: itemId+',',
                    price: 50000,
                    ongkir: 10000
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('error')
                    expect(res.body.error).to.be.an('array')
                    expect(res.body.error[0]).to.equal('login first')
                    done()
                })
            })
            it('should send an error response with status code 401 because admin don\'n have authorization', function(done) {
                chai.request(app)
                .post(`/click/carts/transaction`)
                .set('token', tokenAdmin)
                .send({
                    items: itemId+',',
                    price: 50000,
                    ongkir: 10000
                })
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('error')
                    expect(res.body.error).to.be.an('array')
                    expect(res.body.error[0].message).to.equal('restricted customer only')
                    done()
                })
            })
        }) 
    })
    describe('GET /carts/transaction', function() {
        describe('succes process', function() {
            it('should send an array with 200 status code', function(done) {
                chai.request(app)
                .get(`/click/carts/transaction`)
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body[0]).to.be.an('object').to.have.any.keys('itemId','status','_id','userId','ongkir','price','totalPrice','createdAt','updatedAt')
                    done()
                })
            })
        })
        describe('error process', function() {
            it('should send an error response with status code 400 because missing token', function(done) {
                chai.request(app)
                .get(`/click/carts/transaction`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('error')
                    expect(res.body.error).to.be.an('array')
                    expect(res.body.error[0]).to.equal('login first')
                    done()
                })
            })
        })
        it('should send an error response with status code 400 because invalid token', function(done) {
            chai.request(app)
            .get(`/click/carts/transaction`)
            .set('token', invalidToken)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object').to.have.any.keys('error')
                expect(res.body.error).to.be.an('array')
                expect(res.body.error[0]).to.equal('login first')
                done()
            })
        })
    })
    describe('GET /carts/transaction/admin', function() {
        describe('succes process', function() {
            it('should send an array with 200 status code', function(done) {
                chai.request(app)
                .get(`/click/carts/transaction/admin`)
                .set('token', tokenAdmin)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('carts')
                    expect(res.body.carts[0]).to.be.an('object').to.have.any.keys('itemId','status','_id','userId','ongkir','price','totalPrice','createdAt','updatedAt')
                    done()
                })
            })
        })
        describe('error process', function() {
            it('should send an error response with status code 400 because missing token', function(done) {
                chai.request(app)
                .get(`/click/carts/transaction/admin`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('error')
                    expect(res.body.error).to.be.an('array')
                    expect(res.body.error[0]).to.equal('login first')
                    done()
                })
            })
            it('should send an error response with status code 400 because invalid token', function(done) {
                chai.request(app)
                .get(`/click/carts/transaction/admin`)
                .set('token', invalidToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('error')
                    expect(res.body.error).to.be.an('array')
                    expect(res.body.error[0]).to.equal('login first')
                    done()
                })
            })
            it('should send an error response with status code 401 because customer not authorized', function(done) {
                chai.request(app)
                .get(`/click/carts/transaction/admin`)
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('error')
                    expect(res.body.error).to.be.an('array')
                    expect(res.body.error[0].message).to.equal('restricted admin only')
                    done()
                })
            })
        })    
    })
    describe('PUT /carts/transaction/:transactionId', function() {
        describe('succes process', function() {
            it('should send an object with 200 status code', function(done) {
                chai.request(app)
                .put(`/click/carts/transaction/${transactionId}`)
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('itemId','status','_id','userId','ongkir','price','totalPrice','createdAt','updatedAt')
                    expect(res.body.status).to.equal('delivered')
                    expect(res.body.itemId).to.be.an('array')
                    expect(res.body.ongkir).to.equal(10000)
                    expect(res.body.price).to.equal(50000)
                    expect(res.body.totalPrice).to.equal(60000)
                    done()
                })
            })
        })
        describe('error process', function() {
            it('should send an error response with status code 400 because missing token', function(done) {
                chai.request(app)
                .put(`/click/carts/transaction/${transactionId}`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('error')
                    expect(res.body.error).to.be.an('array')
                    expect(res.body.error[0]).to.equal('login first')
                    done()
                })
            })
            it('should send an error response with status code 400 because invalid token', function(done) {
                chai.request(app)
                .put(`/click/carts/transaction/${transactionId}`)
                .set('token', invalidToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('error')
                    expect(res.body.error).to.be.an('array')
                    expect(res.body.error[0]).to.equal('login first')
                    done()
                })
            })
            it('should send an error response with status code 404 because invalid transactionId', function(done) {
                chai.request(app)
                .put(`/click/carts/transaction/1234`)
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object').to.have.any.keys('error')
                    expect(res.body.error).to.be.an('array')
                    expect(res.body.error[0]).to.equal('data not found')
                    done()
                })
            })
        })    
    })
})

