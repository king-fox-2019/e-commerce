const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const fs = require('fs')
const ProductModel = require('../models/product')
const UserModel = require('../models/user')


const app = require('../app')
let tokenAdmin = ''
let tokenCustomer = ''
let productId = ''

chai.use(chaiHttp)

before(function(done){
    UserModel.create({
        fullname : 'administration',
        email : 'admin@mail.com',
        password : 'administration',
        role : 'admin',
    })
    .then(result => {
        // console.log('Admin created from hook before with token ', result)
        UserModel.create({
            fullname : 'customer',
            email : 'customer@mail.com',
            password : 'customer',
            role : 'customer',
        })
        .then(result => {
            // console.log('Customer created from hook before with token ', result)
        })
        .catch(err => {
            console.log(err)
        })
        done()
    })
    .catch(err => {
        console.log(err)
    })
    
})



after(function(done){
    UserModel.deleteMany()
    .then(_ =>{
        return ProductModel.deleteMany()  
    })
    .then(_ =>{
        console.log('validation testing completed')
        done()
    })
    .catch(err =>{
        console.log(err)
    })
})



describe('Test Ecommerce - Product routes', function(){

    describe('Admin login', function(){
        it('should return success when the value is success', function(done){
            chai.request(app).post('/users/signin').send({
                email : 'admin@mail.com',
                password : 'administration'
            }).end(function(err,res){
                tokenAdmin = res.body.access_token
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('access_token')
                done()
            })
        })
    })

    describe('Customer login', function(){
        it('should return success when the value is success', function(done){
            chai.request(app).post('/users/signin').send({
                email : 'customer@mail.com',
                password : 'customer'
            }).end(function(err,res){
                tokenCustomer = res.body.access_token
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('access_token')
                done()
            })
        })
    })
    describe('Success show all product' , function(){
        it(`should return an array of products with status 200`, function(done){
            chai.request(app)
                .get('/products')
                .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done()
            })
        })
    })

    describe('Success find by productId product', function(){
        it('find product by id should return success message with status 200', function(done){
            chai.request(app)
            .get('/products/'+productId)
            .set('token',tokenCustomer)
            .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            done()
            })
        })
    })

    describe('Success create product' , function(){
        this.timeout(10000)
        it(`create should return success message with status 201`, function(done){
            chai.request(app)
                
                .post('/products')
                .set('token',tokenAdmin)
                .attach('images',fs.readFileSync('./test/img/product1.jpg'),'product1.jpg')
                // .attach('images',fs.readFileSync('./test/img/product2.jpg'),'product2.jpg')
                // .attach('images',fs.readFileSync('./test/img/product3.jpg'),'product3.jpg')
                .field('name', 'Air Jordan IV cactus Jack')
                .field('description', 'The way to describe the Travis Scott Air Jordan 4 Retros properly would be to use the rappers own adlib: la flame. These Jordan 4s were made in collaboration with rapper, Travis Scott and nicknamed the “Cactus Jack” edition. Similar in design to the infamous Eminem pair, these feature a lighter shade of blue suede on the upper. ')
                .field('price', '3990000')
                .field('tags','jordan')
                .field('tags','men')
                .field('tags','blue')
                .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(201)
                productId = res.body._id
                console.log(productId)
                done()
            })
        })
    })

    describe('Success update product', function(){
        it('update should return success message with status 200', function(done){
            this.timeout(10000)
            chai.request(app)
                .put(`/products/${productId}`).send({
                    name : 'Air Jordan IV cactus Jack - update',
                    description : 'The way to describe the Travis Scott Air Jordan 4 Retros properly would be to use the rappers own adlib: la flame. These Jordan 4s were made in collaboration with rapper, Travis Scott and nicknamed the “Cactus Jack” edition. Similar in design to the infamous Eminem pair, these feature a lighter shade of blue suede on the upper.',
                    price: 2490000
                })
                .set('token',tokenAdmin)
                // .field('name', 'Air Jordan IV cactus Jack - update')
                // .field('description', 'The way to describe the Travis Scott Air Jordan 4 Retros properly would be to use the rappers own adlib: la flame. These Jordan 4s were made in collaboration with rapper, Travis Scott and nicknamed the “Cactus Jack” edition. Similar in design to the infamous Eminem pair, these feature a lighter shade of blue suede on the upper. ')
                // .field('price', '3990000')
                .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(201)
                done()
            })
        })
    })

    describe('Error create product' , function(){
        this.timeout(10000)
        it(`create should return error not authorized with status 401`, function(done){
            chai.request(app)
                
                .post('/products')
                .set('token',tokenCustomer)
                .attach('images',fs.readFileSync('./test/img/product1.jpg'),'product2.jpg')
                .field('name', 'Air Jordan IV cactus Jack')
                .field('description', 'size US 9.5 | BNIB')
                .field('stock', '1')
                .field('price', '6500000')
                .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(401)
                done()
            })
        })
    })
    

    describe('Error delete product', function(){
        it('delete should return error not authorized message with status 401', function(done){
            chai.request(app)
            .delete('/products/'+productId)
            .set('token',tokenCustomer)
            .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(401)
            done()
            })
        })
    })
    

    describe('Error update product', function(){
        it('update should return error not authorized with status 401', function(done){
            chai.request(app)
                .put('/products/'+productId)
                .set('token',tokenCustomer)
                .attach('images',fs.readFileSync('./test/img/product1.jpg'),'product2.jpg')
                .field('name', 'Air Jordan IV cactus Jack')
                .field('description', 'size US 10 | BNIB')
                .field('stock', '1')
                .field('price', '6000000')
                .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(401)
                done()
            })
        })
    })

    describe('Success delete product', function(){
        it('delete should return success message with status 200', function(done){
            chai.request(app)
            .delete('/products/'+productId)
            .set('token',tokenAdmin)
            .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            done()
            })
        })
    })
})