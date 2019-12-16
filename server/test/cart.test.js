const chai  = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app.js')
const userModel = require('../models/user')
const cartModel = require('../models/cart')
const expect = chai.expect
const fs = require('fs')

chai.use(chaiHttp)

const userSignUp = {
    name : 'mail bin mail',
    email : 'mail@mail.com',
    password : 'mailsimail',
    imgUrl : './img/profil_avatdwdar.jpg',
    role : 'customer'
}

const userLogin = {
    email : 'anggabanny@admins.com',
    password : '123456'
}

const userLoginMember = {
    email : 'anggabanny@members.com',
    password : '123456'
}

// create account user
before(function(){
    userModel.create({
        name : 'anggabanny',
        email : 'anggabanny@admins.com',
        password : '123456',
        image : './img/FV4687_SL_eCom.jpg'
    })
    .then(user=>{
        return userModel.create({
            name : 'anggabanny',
            email : 'anggabanny@members.com',
            password : '123456',
            image : './img/FV4687_SL_eCom.jpg'
        })
    })
    .then(user=>{
        console.log(`testing: success create user`);
    })
    .catch(console.log)
})

// delete data after testing
after(function(done){
    userModel.deleteMany({})
        .then(()=>{
            console.log(`testing: delete all data users success`);
            done()
        })
        .catch(console.log)
})

// process validation with mochajs
describe('CART Routes',function(){
    describe('/cart',function(){
        describe('GET /cart success process',function(){
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
        })
    })
})