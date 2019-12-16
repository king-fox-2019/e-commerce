const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');

chai.use(chaiHttp);

let tokenSuperAdmin;

describe("User Admin (Only) Route Testing", function () {
    describe(" POST /users/registersuperadmin", function () {
        it("should successfully to seed SuperAdmin with status 201", function (done) {
            let newAdmin = {
                name: "hengkisuperadmin",
                email: "hengki.super.admin@gmail.com",
                password: "hengki.super.admin"
            };

            chai
            .request(app)
            .post("/users/registersuperadmin")
            .send(newAdmin)
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an("object");
                expect(res.body.name).to.equal("hengkisuperadmin");
                //expect(res.body).to.have.keys(['name',"imageUrl","role"]);
                done()
            });
        });
    });
    describe("POST /users/login", function() {
        it("should successfully login for super admin", function(done) {
            let user = {
                "email": "hengki.super.admin@gmail.com",
                "password": "hengki.super.admin"
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
                expect(res.body).to.have.all.keys("token","name","imageUrl","role")
                tokenSuperAdmin = res.body.token
                console.log('tokenSuperAdmin => ',tokenSuperAdmin);
                done();
            })
        })
        it("should failed to login super admin (wrong email) with status 400", function(done){
            let user = {
                "email": "hengki.super.admin.email.salah@gmail.com",
                "password": "hengki.super.admin"
            }
            chai
            .request(app)
            .post("/users/login")
            .send(user)
            .end(function(err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an("object");
                expect(res.body.message).to.equal("Email is not registered !");
                expect(res.body).to.have.all.keys('message');
                done();
            })
        })
        it("Should failed to login super admin (wrong password) with status 400", function(done) {
            let user = {
                "email": "hengki.super.admin@gmail.com",
                "password": "hengki.super.admin.password.salah",
            }
            chai
            .request(app)
            .post("/users/login")
            .send(user)
            .end(function(err,res){
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
    describe(" POST /users/registeradmin", function () {
        it("should success to invite admin with status 201 with no error", function(done) {
            let user = {
                name: "admin",
                email: "admin@gmail.com",
                password: "admin123"
            }
            chai
            .request(app)
            .post("/users/registeradmin")
            .set({authorization:tokenSuperAdmin})
            .send(user)
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an("object")
                expect(res.body.name).to.equal("admin")
                //expect(res.body).to.have.keys(['name',"imageUrl","role"]);
                done()
            });
        })
    });
    describe(" POST /users/registeradmin", function () {
        it("should failed to invite admin with status 401 error (not authorized as no token included)", function(done) {
            let user = {
                name: "admin1",
                email: "admin1@gmail.com",
                password: "admin1234"
            }
            chai
            .request(app)
            .post("/users/registeradmin")
            .send(user)
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.body).to.be.an("object")
                expect(res.body.message).to.equal("Token is undefined")
                expect(res.body).to.have.all.keys('message');
                done()
            });
        })
    });
});