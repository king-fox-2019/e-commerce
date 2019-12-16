const chai  = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app.js')
const userModel = require('../models/user')
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
    email : 'anggabanny@admin.com',
    password : '123456'
}

const userLoginMember = {
    email : 'anggabanny@member.com',
    password : '123456'
}

// create account user
before(function(){
    userModel.create({
        name : 'anggabanny',
        email : 'anggabanny@admin.com',
        password : '123456',
        image : './img/FV4687_SL_eCom.jpg'
    })
    .then(user=>{
        return userModel.create({
            name : 'anggabanny',
            email : 'anggabanny@member.com',
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
describe('User Routes',function(){
    describe('POST /user',function(){
        describe('/user/login success process',function(){
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
            it('get user with 200 status code',function(done){
                // this.timeout(1/5000);
                // setTimeout(done, 15000);
                chai.request(app)
                .get('/user')
                .set('token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
            })
        })
        describe('/user/login error process if not admin',function(){
            let tokenOne;
            before(function(done){
                chai.request(app)
                .post('/user/login')
                .send(userLoginMember)
                .end(function(err,res){
                    tokenOne = res.body.token
                    done()
                })
            })
            it('error status 401 status code',function(done){
                chai.request(app)
                chai.request(app)
                .get('/user')
                .set('token', tokenOne)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    done()
                })
            })
        })
        describe('/user/register register acccount',function(){
            it('create user with 201 status code',function(done){
                chai.request(app)
                .post('/user/register')
                .field('name', 'anggabanny')
                .field('email', 'anggabanny@testing.com')
                .field('password', 'testing')
                .attach('image', fs.readFileSync("./test/img/FV4687_SL_eCom.jpg"), "FV4687_SL_eCom.jpg")
                .end(function(err,res){
                    image = res.body.image
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    done()
                })
            })
        })
        describe('/user/register error register process without name',function(){
            it('create user with 400 status code without name',function(done){
                chai.request(app)
                .post('/user/register')
                .field('email', 'anggabanny@testing.com')
                .field('password', 'testing')
                .attach('image', fs.readFileSync("./test/img/FV4687_SL_eCom.jpg"), "FV4687_SL_eCom.jpg")
                .end(function(err,res){
                    image = res.body.image
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('name is required')
                    done()
                })
            })
        })
        describe('/user/register error register process without email',function(){
            it('create user with 400 status code without email',function(done){
                chai.request(app)
                .post('/user/register')
                .field('angga', 'anggabanny')
                .field('password', 'testing')
                .attach('image', fs.readFileSync("./test/img/FV4687_SL_eCom.jpg"), "FV4687_SL_eCom.jpg")
                .end(function(err,res){
                    image = res.body.image
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('email is required')
                    done()
                })
            })
        })
        describe('/user/register error register process without password',function(){
            it('create user with 400 status code without password',function(done){
                chai.request(app)
                .post('/user/register')
                .field('angga', 'anggabanny')
                .field('email', 'anggabanny@testing.com')
                .attach('image', fs.readFileSync("./test/img/FV4687_SL_eCom.jpg"), "FV4687_SL_eCom.jpg")
                .end(function(err,res){
                    image = res.body.image
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array')
                    done()
                })
            })
        })
        describe('/user/register error register process with password less than 5',function(){
            it('create user with 400 status code password less than 5',function(done){
                chai.request(app)
                .post('/user/register')
                .field('password', 'raha')
                .field('name', 'anggabanny')
                .field('email', 'anggabanny@testing.com')
                .attach('image', fs.readFileSync("./test/img/FV4687_SL_eCom.jpg"), "FV4687_SL_eCom.jpg")
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.equal('Validation Error')
                    expect(res.body.errors).to.be.an('array').that.includes('Password Minimum Contain 5 Character')
                    done()
                })
            })
        })
        describe('error register process without image',function(){
            it('create user with 400 status code without image',function(done){
                chai.request(app)
                .post('/user/register')
                .set('password', 'rahasian dong')
                .set('name', 'anggabanny')
                .set('email', 'anggabanny@testing.com')
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.equal('Validation Error')
                    done()
                })
            })
        })
        describe('/user/money/topup failed top up money account user',function(){
            let tokenOne;
            before(function(done){
                chai.request(app)
                .post('/user/login')
                .send(userLoginMember)
                .end(function(err,res){
                    tokenOne = res.body.token
                    done()
                })
            })
            it('failed top up money account user with 404 status code',function(done){
                chai.request(app)
                .post('/user/money/topup')
                .set('token', tokenOne)
                .send('money', 50000)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    done()
                })
            })
        })
    })
})