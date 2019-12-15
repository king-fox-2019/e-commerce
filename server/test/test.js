const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = chai.expect
const userModel = require('../models/user')
const cartModel = require('../models/cart')

chai.use(chaiHttp)

let token = 'untuk tampung test token'
describe.only('Test User Router', function() {
    before(function(){
        userModel.deleteMany({name : 'user'},function(err,data){
            if (err) {
                console.log(err)
              } else {
                console.log('delete succsess');
              }
        })
    })
    describe('Test /users/register route', function() {
        it('should return user and status code 201', function(done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    name: 'user',
                    email: 'user@mail.com',
                    password: '123456',
                    phoneNumber: '081234567890'
                })
                .then(function(res) {
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('name').equal(res.body.name)
                    expect(res.body).to.have.property('email').equal(res.body.email)
                    expect(res.body).to.have.property('phoneNumber').equal(res.body.phoneNumber)
                    done()
                })
                .catch(done)
            })
        })
    describe('Test validation name',function(){
        it('should return status 400 when object name is empty', function(done){
            chai.request(app)
                .post('/users/register')
                .send({
                    name: '',
                    email: 'user2@mail.com',
                    password: '123456',
                    phoneNumber: '081234567890'
                })
                .then(function(res){
                    // console.log('bodyNya =====>', res.body.message)
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('you must enter your name')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test validation email',function(){
        it('should return status 400 when object email is duplicate', function(done){
            chai.request(app)
                .post('/users/register')
                .send({
                    name: 'user',
                    email: 'user@mail.com',
                    password: '123456',
                    phoneNumber: '081234567890'
                })
                .then(function(res){
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('email already registered')
                    done()
                })
                .catch(done)
        })
        it('should return status 400 when object email is not email', function(done){
            chai.request(app)
                .post('/users/register')
                .send({
                    name: 'user',
                    email: 'usermail',
                    password: '123456',
                    phoneNumber: '081234567890'
                })
                .then(function(res){
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('Invalid email format')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test validation password',function(){
        it('should return status 400 when object password length less then 6', function(done){
            chai.request(app)
                .post('/users/register')
                .send({
                    name: 'user',
                    email: 'user2@mail.com',
                    password: '12345',
                    phoneNumber: '081234567890'
                })
                .then(function(res){
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('minimum password length is 6 characters')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test validation phoneNumber',function(){
        it('should return status 400 when object phoneNumber is empty', function(done){
            chai.request(app)
                .post('/users/register')
                .send({
                    name: 'user',
                    email: 'user2@mail.com',
                    password: '123456',
                    phoneNumber: ''
                })
                .then(function(res){
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('you must enter your phone number')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test /users/login route', function() {
        it('should return (message,user,token) and status code 200', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'user@mail.com',
                    password: '123456'
                })
                .then(function(res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('token').equal(res.body.token)
                    expect(res.body).to.have.property('user').equal(res.body.user)
                    expect(res.body).to.have.property('message').equal(res.body.message)
                    token = res.body.token
                    done()
                })
                .catch(done)
        })
        it('should return status 404 when email is not registered', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'user3@mail.com',
                    password: '123456'
                })
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('message').equal('user not found')
                    done()
                })
                .catch(done)
        })
        it('should return status 403 when password is wrong', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'user@mail.com',
                    password: '1234'
                })
                .then(function(res) {
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.property('message').equal('Wrong Password')
                    done()
                })
                .catch(done)
        })
    })
})

let temp = "untuk tampung id terakhir"
describe('Test Item Router', function() {
    describe('Test POST /items route', function() {
            it('should return created items and status code 201', function(done) {
                chai.request(app)
                    .post('/items')
                    .send({
                        name: '2test',
                        price: 100000,
                        stock: 10,
                        image: 'imageTest'
                    })
                    .then(function(res) {
                        expect(res).to.have.status(201)
                        expect(res.body).to.have.property('name').equal(res.body.name)
                        expect(res.body).to.have.property('price').equal(res.body.price)
                        expect(res.body).to.have.property('stock').equal(res.body.stock)
                        expect(res.body).to.have.property('image').equal(res.body.image)
                        done()
                    })
                    .catch(done)
                })
        describe('Test validation name',function(){
            it('should return status 400 when object name is empty', function(done){
                chai.request(app)
                    .post('/items')
                    .send({
                        name: '',
                        price: 100000,
                        stock: 10,
                        image: 'imageTest'
                    })
                    .then(function(res){
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('message')
                        expect(res.body.message[0]).to.equal('you must enter your name')
                        done()
                    })
                    .catch(done)
            })
        })
        describe('Test validation price',function(){
            it('should return status 400 when object price less then 500', function(done){
                chai.request(app)
                    .post('/items')
                    .send({
                        name: 'test',
                        price: 0,
                        stock: 10,
                        image: 'imageTest'
                    })
                    .then(function(res){
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('message')
                        expect(res.body.message[0]).to.equal('min price 500')
                        done()
                    })
                    .catch(done)
            })
            it('should return status 400 when object price is empty', function(done){
                chai.request(app)
                    .post('/items')
                    .send({
                        name: 'test',
                        price: '',
                        stock: 10,
                        image: 'imageTest'
                    })
                    .then(function(res){
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('message')
                        expect(res.body.message[0]).to.equal('you must enter your price')
                        done()
                    })
                    .catch(done)
            })
        })
        describe('Test validation stock',function(){
            it('should return status 400 when object stock is empty', function(done){
                chai.request(app)
                    .post('/items')
                    .send({
                        name: 'test',
                        price: 100000,
                        stock: '',
                        image: 'imageTest'
                    })
                    .then(function(res){
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('message')
                        expect(res.body.message[0]).to.equal('you must enter your stock')
                        done()
                    })
                    .catch(done)
            })
        })
        describe('Test validation image',function(){
            it('should return status 400 when object image is empty', function(done){
                chai.request(app)
                    .post('/items')
                    .send({
                        name: 'test',
                        price: 100000,
                        stock: 10,
                        image: ''
                    })
                    .then(function(res){
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('message')
                        expect(res.body.message[0]).to.equal('you must enter your image')
                        done()
                    })
                    .catch(done)
            })
        })
    })
    describe('Test GET /items route', function() {
        it('should return all items and status code 200', function(done) {
            chai.request(app)
                .get('/items')
                .then(function(res) {
                    expect(res).to.have.status(200)
                    expect(res.body[(res.body.length) -1]).have.property('name').to.be.a('string')
                    expect(res.body[(res.body.length) -1]).have.property('price').to.be.a('number')
                    expect(res.body[(res.body.length) -1]).have.property('stock').to.be.a('number')
                    expect(res.body[(res.body.length) -1]).have.property('image').to.be.a('string')
                    temp =  res.body[(res.body.length) -1]._id
                    done()
                })
                .catch(done)
            })
        })
    describe('Test GET /items/:id', function(){
        it('should return one items and status code 200', function(done) {
            chai.request(app)
                .get('/items/5defa0bdfeb63870c2885f50')
                .then(function(res) {
                    expect(res).to.have.status(200)
                    expect(res.body).have.property('name').to.be.a('string')
                    expect(res.body).have.property('price').to.be.a('number')
                    expect(res.body).have.property('stock').to.be.a('number')
                    expect(res.body).have.property('image').to.be.a('string')
                    done()
                })
                .catch(done)
            })
        it('should return status 404 when cannot find data', function(done) {
            chai.request(app)
                .get('/items/123456')
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body.message).to.equal('not found')
                    done()
                })
                .catch(done)
            })
    })
    describe('Test PUT /items/:id', function(){
        it('should return status code 200 when update item', function(done) {
            chai.request(app)
            .put(`/items/${temp}`)
            .send({
                name: 'test new',
                price: 99999,
                stock: 99,
                image: ''
            })
            .then(function(res) {
                console.log(res)
                expect(res).to.have.status(200)
                done()
            })
            .catch(done)
        })
    })
    describe('Test DELETE /items/:id', function(){
        it('should return status code 200', function(done) {
            chai.request(app)
                .delete(`/items/${temp}`)
                .then(function(res) {
                    expect(res).to.have.status(200)
                    done()
                })
                .catch(done)
            })
    })
})


describe.only('Test Cart Router', function() {
    before(function(){
       cartModel.deleteMany({count : 2},function(err,data){
            if (err) {
                console.log(err)
              } else {
                console.log('delete succsess');
              }
        })
    })
    describe('Test POST /carts route', function() {
            it('should return created cart and status code 201', function(done) {
                chai.request(app)
                    .post('/carts')
                    .send({
                        product: '5defa0bdfeb63870c2885f50',
                        count: 2,
                        status: false,
                    })
                    .set('token', token)
                    .then(function(res) {
                        expect(res).to.have.status(201)
                        expect(res.body).to.have.property('product').equal(res.body.product)
                        expect(res.body).to.have.property('count').equal(res.body.count)
                        expect(res.body).to.have.property('status').equal(res.body.status)
                        expect(res.body).to.have.property('customer')
                        done()
                    })
                    .catch(done)
            })
        })        
    describe('Test validation status',function(){
            it('should return status 201 and status is false when object status is empty', function(done){
                chai.request(app)
                    .post('/carts')
                    .send({
                        product: '5defa0bdfeb63870c2885f50',
                        count: 2,
                    })
                    .set('token', token)
                    .then(function(res){
                        expect(res).to.have.status(201)
                        expect(res.body).to.have.property('product').equal(res.body.product)
                        expect(res.body).to.have.property('count').equal(res.body.count)
                        expect(res.body).to.have.property('status').equal(false)
                        expect(res.body).to.have.property('customer')
                        done()
                    })
                    .catch(done)
            })
        })
    describe('Test GET /carts route', function() {
        it('should return all items and status code 200', function(done) {
            chai.request(app)
                .get('/carts')
                .set('token', token)
                .then(function(res) {
                    expect(res).to.have.status(200)
                    expect(res.body[(res.body.length) -1]).have.property('product')
                    expect(res.body[(res.body.length) -1]).have.property('count').to.be.a('number')
                    expect(res.body[(res.body.length) -1]).have.property('status').to.be.a('boolean')
                    expect(res.body[(res.body.length) -1]).have.property('customer')
                    done()
                })
                .catch(done)
            })
        })
    describe('Test GET /carts/:id', function(){
        it('should return one items and status code 200', function(done) {
            chai.request(app)
                .get('/carts/5df080270f04aa1c888022af')
                .set('token', token)
                .then(function(res) {
                    expect(res).to.have.status(200)
                    expect(res.body).have.property('product')
                    expect(res.body).have.property('count').to.be.a('number')
                    expect(res.body).have.property('status').to.be.a('boolean')
                    expect(res.body).have.property('customer')
                    done()
                })
                .catch(done)
            })
        it('should return status 404 when cannot find data', function(done) {
            chai.request(app)
                .get('/carts/123456')
                .set('token', token)
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body.message).to.equal('not found')
                    done()
                })
                .catch(done)
            })
    })
    // describe('Test PUT /items/:id', function(){
    //     it('should return status code 200 when update item', function(done) {
    //         chai.request(app)
    //         .put(`/items/${temp}`)
    //         .send({
    //             name: 'test new',
    //             price: 99999,
    //             stock: 99,
    //             image: ''
    //         })
    //         .then(function(res) {
    //             console.log(res)
    //             expect(res).to.have.status(200)
    //             done()
    //         })
    //         .catch(done)
    //     })
    // })
    // describe('Test DELETE /items/:id', function(){
    //     it('should return status code 200', function(done) {
    //         chai.request(app)
    //             .delete(`/items/${temp}`)
    //             .then(function(res) {
    //                 expect(res).to.have.status(200)
    //                 done()
    //             })
    //             .catch(done)
    //         })
    // })
})
