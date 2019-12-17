const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const User = require('../models/user');

chai.use(chaiHttp);

after(function(done) {
    if (process.env.NODE_ENV === 'test') {
        User.deleteMany({})
          .then(function() {
            done();
          })
          .catch(function(err) {
            console.log('err => ',err);
            done(err)
          })
    }
});

let token;

describe("User Route Testing", function () {
    describe(" POST /users/register", function () {
        it("should successfully register new customer", function (done) {
            let user = {
                name: "hengki",
                email: "hengki10@gmail.com",
                password: "hengki10"
            };

            chai
            .request(app)
            .post("/users/register")
            .send(user)
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an("object")
                expect(res.body).to.have.keys(['token','name',"imageUrl","role","balance"]);
                expect(res.body.name).to.equal("hengki")
                expect(res.body.password).to.not.equal("hengki10")
                expect(res.body.token).to.be.an("string")
                expect(res.body.imageUrl).to.be.an("string")
                expect(res.body.role).to.equal("customer")
                expect(res.body.balance).to.be.an("number")
                expect(res.body.balance).to.be.at.least(0)
                done()
            });
        });
        it("should error to register new customer (email & password not available)", function(done) {
            let emptyReqBody = {};
            chai
            .request(app)
            .post("/users/register")
            .send(emptyReqBody)
            .end(function(err, res){
                console.log("res.body => ", JSON.stringify(res.body,null,3))
                expect(err).to.be.null;
                expect(res).to.have.status(401)
                expect(res.body.message).to.equal("Email/password is required")
                expect(res.body).to.have.all.keys('message');
                done()
            })
        })
    });
    describe("POST /users/login", function() {
        it("should successfully login as customer", function(done) {
            let user = {
                "email": "hengki10@gmail.com",
                "password": "hengki10"
            }
            chai
            .request(app)
            .post("/users/login")
            .send(user)
            .end(function(err,res){
                console.log("res.body => ", JSON.stringify(res.body,null,3))
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object")
                expect(res.body).to.have.all.keys("token","name","imageUrl","role","balance")
                token = res.body.token
                done();
            })
        })
        it("should failed to login (wrong email)", function(done){
            let user = {
                "email": "emailsalah@email.com",
                "password": "hengki10"
            }
            chai
            .request(app)
            .post("/users/login")
            .send(user)
            .end(function(err, res) {
                console.log("res.body => ", JSON.stringify(res.body,null,3))
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an("object")
                expect(res.body.message).to.equal("Email is not registered !")
                expect(res.body).to.have.all.keys('message');
                done();
            })
        })
        it("Should failed to login (wrong password)", function(done) {
            let user = {
                "email": "hengki10@gmail.com",
                "password": "password.sengaja.salah"
            }
            chai
            .request(app)
            .post("/users/login")
            .send(user)
            .end(function(err,res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an("object")
                expect(res.body.message).to.equal("Password is Invalid !")
                expect(res.body).to.have.all.keys('message');
                done();
            })
        })
    });
    describe("GET /users/profile", function() {
        it("should successs to retrieve customer's profile", function(done) {
            chai
            .request(app)
            .get("/users/profile")
            .set({ authorization:token })
            .end(function(err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(200)
                expect(res.body).to.be.an("object")
                expect(res.body).to.have.all.keys("imageUrl", "accountType", "name", "balance", "role");
                done()
            })
        })
    })
});