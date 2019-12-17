const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require('../app')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const Product = require('../models/product')


chai.use(chaiHttp)
const expect = chai.expect


// router.use(authentication)
// router.get('/', TransactionController.getTransaction)
// router.get('/admin', authorization, TransactionController.adminFindAll)
// router.get('/admin/:user_id', authorization, TransactionController.adminFind)
// router.post('/', TransactionController.createTransaction)
// router.patch('/:id', authentication, transactionAuth, TransactionController.transactionDone)

describe('TRANSACTION ENDPOINTS', function () {
    this.timeout(10000)

    let product = {
        _id: '5dca8614fb55071d413b5c48',
        quantity: 1,
        name: 'product',
        stock: 10,
        description: 'this is product description',
        price: 5000,
        category: 'test'
    }

    let Admin = {
        username: 'user',
        email: 'user@mail.com',
        password: 'user',
        isAdmin: true
    }

    let Customer = {
        username: 'customer gila HAHAHAHAHHAHA',
        email: 'customer@mail.com',
        password: 'customer',
        isAdmin: false
    }
    let productCreated = {}

    let tokenCustomer = '',
        token = '',
        customerId = '',
        transactionId = '';


    before(function (done) {
        User.create(Admin)
            .then(result => {
                chai.request(app)
                    .post('/user/login')
                    .send({
                        email: Admin.email,
                        password: Admin.password
                    })
                    .end(function (err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            token = res.body.token
                        }
                    })
                let newProduct = { ...product }
                return Product.create(newProduct)
            })
            .then(created => {
                // console.log(created);
                productCreated = created
                return User.create(Customer)
            })
            .then(created => {
                // console.log(created._doc);
                chai.request(app)
                    .post('/user/login')
                    .send({
                        email: Customer.email,
                        password: Customer.password
                    })
                    .end(function (err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            tokenCustomer = res.body.token
                            chai.request(app)
                                .patch('/user/cart')
                                .set('token', tokenCustomer)
                                .send({ product_id: productCreated._id, quantity: 2 })
                                .end(function (err, res) {
                                    expect(err).to.be.null
                                    expect(res).to.have.status(200)
                                    expect(res.body).to.be.an('object')
                                    done()
                                })
                        }
                    })
            }).catch(console.log)
    })

    after(function (done) {
        User.deleteMany({})
            .then(result => {
                return Transaction.deleteMany({})
            })
            .then(result => {
                return Product.deleteMany({})
            })
            .then(result => done())
            .catch(err => {
                console.log(err)
            })
    })


    describe('POST /transactions', function () {
        describe('Success response:', function () {
            it('Should return an object of new transaction', function (done) {
                chai.request(app)
                    .post('/transactions')
                    .set('token', tokenCustomer)
                    .then(res => {
                        expect(res.body).to.be.an('object')
                        expect(res).to.have.status(201)
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('products')
                        expect(res.body).to.have.property('user_id')
                        transactionId = res.body._id
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        })

        describe('error response:', function () {
            it('failed checkout', function (done) {
                let newCustomerToken = ''
                chai.request(app)
                    .post('/user/login')
                    .send({
                        email: Customer.email,
                        password: Customer.password
                    })
                    .end(function (err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('ini kenapa ya kok kamu ngamuk2');
                            newCustomerToken = res.body.token
                            chai.request(app)
                                .post('/transactions')
                                .set('token', newCustomerToken)
                                .end(function (err, res) {
                                    expect(err).to.be.null
                                    expect(res).to.have.status(400)
                                    expect(res.body.message).to.equal('Your cart is empty')
                                    done()
                                })
                        }
                    })
            })
        })
    })

    describe('Get user\'s transaction', function () {
        describe('success process', function () {
            it('should return an array of objects with status code 200', function (done) {
                chai.request(app)
                    .get('/transactions')
                    .set('token', tokenCustomer)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('array')
                        done()
                    })
            })
        })
        describe('error process', function () {
            it('should return an object with message you have to login first (missing token) and status 401', function (done) {
                chai.request(app)
                    .get('/transactions')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object').to.have.any.keys('message')
                        expect(res.body.message[0]).to.equal('you have to login first')
                        done()
                    })
            })
        })
    })
    describe('Get all transactions by admin', function () {
        describe('success process', function () {
            it('should return an array of objects with status code 200', function (done) {
                chai.request(app)
                    .get('/transactions/admin')
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('array')
                        done()
                    })
            })
        })
        describe('error process', function () {
            it('should return an object with message you have to login first (missing token) and status 401', function (done) {
                chai.request(app)
                    .get('/transactions/admin')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('object').to.have.any.keys('message')
                        expect(res.body.message[0]).to.equal('you have to login first')
                        done()
                    })
            })
            it('should return an object with status 401 when using customer token', function (done) {
                chai.request(app)
                    .get('/transactions/admin')
                    .set('token', tokenCustomer)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body).to.be.an('object').to.have.any.keys('message')
                        expect(res.body.message).to.equal(`You're not authorize to perform this action`)
                        done()
                    })
            })
        })
    })


})