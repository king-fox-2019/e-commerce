const chai  = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app.js')
const productModel = require('../models/product')
const userModel = require('../models/user')
const expect = chai.expect
const fs = require('fs')

chai.use(chaiHttp)

const userLogin = {
    email : 'anggabanny@admina.com',
    password : '123456'
}

const userLoginMember = {
    email : 'anggabanny@membera.com',
    password : '123456'
}

// create account user
let tokenadmin;

before(function(done){
    userModel.create({
        name : 'anggabanny',
        email : 'anggabanny@admina.com',
        password : '123456',
        image : './img/FV4687_SL_eCom.jpg'
    })
    .then(user=>{
        console.log(`testing: success create user`);
        return userModel.create({
            name : 'anggabanny',
            email : 'anggabanny@membera.com',
            password : '123456',
            image : './img/FV4687_SL_eCom.jpg'
        })
    })
    .then(user=>{
        chai.request(app)
        .post('/user/login')
        .send(userLogin)
        .end(function(err,res){
            tokenadmin = res.body.token
            done()
        })
        console.log(`testing: success create user`);
    })
    .catch(console.log)
})

// delete data after testing
after(function(done){
    userModel.deleteMany({})
        .then(()=>{
            return productModel.deleteMany({})
        })
        .then(()=>{
            console.log(`testing: delete all data users success`);
            done()
        })
        .catch(console.log)
})



// process validation with mochajs
describe('Product Routes',function(){
    describe('/product',function(){
        // describe('POST /product/ create product',function(){
        //     let token;
        //     before(function(done){
        //         chai.request(app)
        //         .post('/user/login')
        //         .send(userLogin)
        //         .end(function(err,res){
        //             token = res.body.token
        //             done()
        //         })
        //     })
        //     it('success 201 status code create product',function(done){
        //         chai.request(app)
        //         .post('/product/create')
        //         .set('token', token)
        //         .field('name', 'adidasa')
        //         .field('size', 30)
        //         .field('price', 800545)
        //         .field('stock', 90)
        //         .attach('image', fs.readFileSync("./test/img/FV4687_SL_eCom.jpg"), "FV4687_SL_eCom.jpg")
        //         .end(function(err,res){
        //             expect(err).to.be.null
        //             expect(res).to.have.status(201)
        //             expect(res.body).to.be.an('object')
        //             done()
        //         })
        //     })
        // })
        describe('/product success process',function(){
            // this.timeout(15000);
            it('get product with 200 status code',function(done){
                // this.timeout(1/5000);
                // setTimeout(done, 15000);
                chai.request(app)
                .get('/product')
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
            })
        })
        describe('POST /product/ create product',function(){
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
            it('error 404 status code create product',function(done){
                chai.request(app)
                .post('/product')
                .set('token', token)
                .field('name', 'adidasa')
                .field('size', 30)
                .field('price', 800545)
                .field('stock', 90)
                .attach('image', fs.readFileSync("./test/img/FV4687_SL_eCom.jpg"), "FV4687_SL_eCom.jpg")
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    done()
                })
            })
        })
        describe('POST /product/ create product',function(){
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
            it('error 401 status code create product',function(done){
                chai.request(app)
                .post('/product')
                .set('token', token)
                .field('name', 'adidasa')
                .field('size', 30)
                .field('price', 800545)
                .field('stock', 90)
                .attach('image', fs.readFileSync("./test/img/FV4687_SL_eCom.jpg"), "FV4687_SL_eCom.jpg")
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    done()
                })
            })
        })
    })
})