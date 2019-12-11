`use strict`

const chai = require('chai')
const chaihttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const expect = chai.expect

chai.use(chaihttp)

let chai_req = chai.request(app)

describe('user route', function () {
    let user = {
        name: 'amanda',
        email: 'amanda@mail',
        phone_number: '098765432223',
        password: '123456789'
    }
    let access_token = 'fake token'

    it('should register without trouble', function (done) {
        chai_req
            .post('/users/register')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201)
                expect(res).to.have.property('access_token')
            })
        // done()
    })

    it('should login and get token', function (done) {
        chai_req
            .post('/users/login')
            .send({ email: user.email, password: user.password })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.property('access_token')
                expect(res).to.have.status(200)
                console.log(res);
            })
        done()
    })

    it("should get user's cart", function (done) {
        chai_req
            .get('/users/cart')
            .send(access_token)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.be.contain(Object)
            })
        done()
    })

    it("should get user's product", function (done) {
        chai_req
            .get('/users/product')
            .send(access_token)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.be.contain(Object)
            })
        done()
    })
})