const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/User')

chai.use(chaiHttp)

describe('User login', function() {

    // before(function() {
    //     User.create({
    //         name: 'master account',
    //         email: 'master@mail.com',
    //         password: '123456'
    //     })
    //         .then(user => console.log('testing: user created'))
    //         .catch(err => console.log(err))
    // });

    // after(function() {
        
    // });

    it('should return user access_token', function(done) {
        chai.request(app)
        .post('/users/login')
        .send({
            email: 'master@mail.com',
            password: '123456'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('access_token')
            done()
        })
    })
    
    it('should return message, user doesn\'t exist', function(done) {
        chai.request(app)
        .post('/users/login')
        .send({
            email: 'test@mail.com',
            password: 'password'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.have.property('message', 'Invalid email or password')
            done() 
        })
    })

    it.only('should return message, Invalid email or password', function(done) {
        chai.request(app)
        .post('/users/login')
        .send({
            email: 'master@mail.com',
            password: '111111'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.have.property('message', 'Invalid email or password')
            done()
        })
    })

})

describe('Register User', function() {

    it('should return user access_token', function(done) {
        chai.request(app)
        .post('/users/register')
        .send({
            name: 'john doe',
            email: 'john@mail.com',
            password: '123456'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.have.property('access_token')
            done()
        })
    })

    it('should return message, name can not be empty', function(done) {
        chai.request(app)
        .post('/users/register')
        .send({
            name: '',
            email: 'john@mail.com',
            password: '123456'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body.message).to.be.an('array').that.include('Name can not be empty')
            done()
        })
    })

    it('should return message, Email can not be empty', function(done) {
        chai.request(app)
        .post('/users/register')
        .send({
            name: 'john doe',
            email: '',
            password: '123456'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body.message).to.be.an('array').that.include('Email can not be empty')
            done()
        })
    })

    it('should return message, Email not valid', function(done) {
        chai.request(app)
        .post('/users/register')
        .send({
            name: 'john doe',
            email: 'not valid mail.com',
            password: '123456'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body.message).to.be.an('array').that.include('Your email is not valid')
            done()
        })
    })

    it('should return message, Email already registered', function(done) {
        chai.request(app)
        .post('/users/register')
        .send({
            name: 'john doe',
            email: 'john@mail.com',
            password: '123456'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body.message).to.be.an('array').that.include('Email already registered')
            done()
        })
    })

    it('should return message, Password at least have 6 character', function(done) {
        chai.request(app)
        .post('/users/register')
        .send({
            name: 'john doe',
            email: 'john@mail.com',
            password: '12'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body.message).to.be.an('array').that.include('Password at least have 6 character')
            done()
        })
    })
})
