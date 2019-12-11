const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/user')
const app = require('../app')

chai.use(chaiHttp)
const expect = chai.expect

// create initial data
let newUser = {
    username: 'nezuko',
    email: 'nezuko@gmail.com',
    password: 'nezuko123',
    address: 'Jalan Iskandar Muda No 2, Jakarta Selatan'
}

let userLogin = {
    email: newUser.email,
    password: newUser.password
}

// hooks
before(function(done){
    User.create({
        username: 'Test',
        email: 'test@gmail.com',
        password: 'test123',
        address: 'Jalan Tanah Kusir No 54, Jakarta Selatan'
    })
    .then(_ => {
        console.log('testing: Initial create user testing success')
        done()
    })
    .catch(console.log)
})

after(function(done){
    if(process.env.NODE_ENV == 'testing'){
        User.deleteMany({})
            .then(_ => {
                console.log('testing: delete user after testing success!')
                done()
            })
            .catch(console.log)
    }
})

describe('User Routes', function(){
    describe('POST /user/register', function (){
        describe('success process', function(){
            it('should return object of user with 201 status code', function(done){
                chai.request(app)
                .post('/user/register')
                .send(newUser)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('message', 'user')
                    expect(res.body.message).to.equal('Register Success!')
                    expect(res.body.password).to.not.equal(newUser.password)
                    done()
                })
            })
        })

        describe('error process', function(){
            it('should return error with status code 400 caused by empty username value', function(done){
                const withoutName = { ...newUser }
                delete withoutName.username
                chai.request(app)
                .post('/user/register')
                .send(withoutName)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.message[0]).to.equal('Username cannot be empty')
                    done()
                })
            })

            it('should return error with status code 400 cause by empty email', function(done){
                const withoutEmail = { ...newUser }
                delete withoutEmail.email
                chai.request(app)
                .post('/user/register')
                .send(withoutEmail)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.message[0]).to.equal('Email cannot be empty')
                    done()
                })
            })

            it('should return error with status code 400 caused by empty password', function(done){
                const withoutPassword = { ...newUser }
                delete withoutPassword.password
                chai.request(app)
                .post('/user/register')
                .send(withoutPassword)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.message[0]).to.equal('Password cannot be empty')
                    done()
                })
            })

            it('should return error with status code 400 caused by empty address', function(done){
                const withoutAddress = { ...newUser }
                delete withoutAddress.address
                chai.request(app)
                .post('/user/register')
                .send(withoutAddress)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.message[0]).to.equal('Address cannot be empty')
                    done()
                })
            })

            it('should return error with status code 400 caused not valid email format', function(done){
                const wrongEmail = { ...newUser }
                wrongEmail.email = 'nezuko.com'
                chai.request(app)
                .post('/user/register')
                .send(wrongEmail)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.message[0]).to.equal('Your email is not valid')
                    done()
                })
            })

            it('should return error with status code 400 caused email unique validation error', function(done){
                const emailUnique = { ...newUser }
                emailUnique.email = 'test@gmail.com'
                chai.request(app)
                .post('/user/register')
                .send(emailUnique)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.message[0]).to.equal('Your email is already registered')
                    done()
                })
            })

            it('should return error with status code 400 caused password validation min length', function(done){
                const passFormat = { ...newUser }
                passFormat.password = 'qwe'
                chai.request(app)
                .post('/user/register')
                .send(passFormat)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.message[0]).to.equal('Password min 5 digits')
                    done()
                })
            })
        })
    })

    describe('POST /user/login', function(){
        describe('success process', function(){
            it('should return object with key (user, token) and status code 200', function(done){
                chai.request(app)
                .post('/user/login')
                .send(userLogin)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('user','token')
                    done()
                })
            })
        })

        describe('error process', function(){
            it('should return error with status code 400 caused email is not registerd in database', function(done){
                const wrongEmail = { ...userLogin }
                wrongEmail.email = 'danang@gmail.com'
                chai.request(app)
                .post('/user/login')
                .send(wrongEmail)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.message).to.equal('Your email is not registered')
                    done()
                })
            })

            it('should return error with status code 400 caused wrong password', function(done){
                const wrongPassword = { ...userLogin }
                wrongPassword.password = 'nezuko123456'
                chai.request(app)
                .post('/user/login')
                .send(wrongPassword)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body.message).to.equal('Your password is wrong')
                    done()
                })
            })

            it('should return error with status code 400 caused empty input from user', function(done){
                const emptyInput = {
                    email: '',
                    password: ''
                }
                chai.request(app)
                .post('/user/login')
                .send(emptyInput)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message', 'code')
                    expect(res.body.message).to.equal('Your email is not registered')
                    done()
                })
            })
        })
    })

    describe('GET /user/info', function(){
        let token = ""

        before(function(done){
            chai.request(app)
            .post('/user/login')
            .send(userLogin)
            .end(function(err,res){
                token = res.body.token
                done()
            })
        })

        describe('success process', function(){
            it('should return object user with status code 200', function(done){
                chai.request(app)
                .get('/user/info')
                .set('access_token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
            })
        })

        describe('error process', function(){
            it('should return object error with status code 401 cause not set any headers to get through authentication', function(done){
                chai.request(app)
                .get('/user/info')
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

    describe('PUT /user/setting', function(){

        let token = ""

        before(function(done){
            chai.request(app)
            .post('/user/login')
            .send(userLogin)
            .end(function(err,res){
                token = res.body.token
                done()
            })
        })

        describe('success process', function(){
            const editUser = {
                address: 'Jalan Kebayoran Lama No 32, Jakarta Selatan'
            }
            it('should return status code 200 with value an user object', function(done){
                chai.request(app)
                .put('/user/setting')
                .set('access_token', token)
                .send(editUser)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('username', 'address')
                    expect(res.body.address).to.not.equal(newUser.address)
                    done()
                })
            })
        })

        describe('error process', function(){
            const editUser = {
                address: 'Jalan Kebayoran Lama No 32, Jakarta Selatan'
            }
            it('should return status code 401 caused not set any headers to get through authentication', function(done){
                chai.request(app)
                .put('/user/setting')
                .send(editUser)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body.message).to.equal('jwt must be provided')
                    done()
                })
            })
        })
    })
})