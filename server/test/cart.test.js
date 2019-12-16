const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');

chai.use(chaiHttp);

let tokenAdmin, userId, tokenCostumer, cartId;

describe("Cart Route Testing", function() {
    describe("Login Testing", function() {
        it("Should successfully login as admin",function(done){
            let user = {
                "email": "admin@gmail.com",
                "password": "admin123"
            }
            chai
            .request(app)
            .post("/users/login")
            .send(user)
            .end(function(err,res){
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                tokenAdmin = res.body.token
                done();
            })
        });
        it("Should successfully login as customer",function(done){
            let user = {
                "email": "hengki10@gmail.com",
                "password": "hengki10"
            }
            chai
            .request(app)
            .post("/users/login")
            .send(user)
            .end(function(err,res){
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                tokenCostumer = res.body.token;
                userId = res.body._id;
                done();
            })
        })
    })
    describe("GET /carts", function() {
        it("should successfully to get user's carts", function(done){
            chai
            .request(app)
            .get("/carts")
            .set({ authorization:tokenCostumer })
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array")
                res.body.forEach(element => {
                    expect(element).to.have.keys(["_id","userId","product","count","isCheckout"])
                });
                done()
            });
        })
        it("should failed to retrieve customer's carts (Token is not available)", function(done){
            chai
            .request(app)
            .get("/carts")
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("Token is undefined");
                done()
            });
        })
    })
    describe("POST /carts", function() {
        it("should success add new data to user carts with respon 201", function(done){
            let data = {
                count: 10,
                product: "5cb9c8441448fb65ada06975",
            }
            chai
            .request(app)
            .post("/carts")
            .set({ authorization:tokenCostumer })
            .send(data)
            .end(function(err,res){
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                cartId = res.body._id;
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an("object")
                expect(res.body).to.have.keys(["_id","userId","product","count","isCheckout"])
                done()
            })
        })
        it("should fail to create carts (using admin's token)", function(done){
            let data = {
                userId: userId,
                product : "5cb9c8441448fb65ada06974",
                stock: 10
            }
            chai
            .request(app)
            .post("/carts")
            .set({ authorization:tokenAdmin })
            .send(data)
            .end(function(err,res){
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("Not Authorized");
                done()
            })
        })
        it("should fail to create carts (no token available)", function(done) {
            let data = {
                userId: userId,
                product : "5cb9c8441448fb65ada06974",
                stock: 10
            }
            chai
            .request(app)
            .post("/carts")
            .send(data)
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("Token is undefined");
                done()
            });
        })
        it("should fail to create carts (carts data is not available)", function(done){
            let emptyData = {}
            chai
            .request(app)
            .post("/carts")
            .set({ authorization:tokenCostumer })
            .send(emptyData)
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("validation");
                done()
            });
        })
    })
    describe("DELETE /carts", function(){
        it("should fail to delete cart (ID Not Found)", function(done){
            chai
            .request(app)
            .delete(`/carts/5cbacfd089874a2327dc0327`)
            .set({authorization:tokenCostumer})
            .end(function(err,res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("Cart ID not found");
                done()
            })
        })
        it("should fail to delete cart (Token is not available)", function(done){
            chai
            .request(app)
            .delete(`/products/5cbacfd089874a2327dc0327`)
            .end(function(err,res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("Token is undefined");
                done()
            })
        })
        it("should fail to delete cart (Token is invalid)", function(done){
            chai
            .request(app)
            .delete(`/products/${cartId}`)
            .set({ authorization: '8v8yd4invalidtoken78s343dgf7' })
            .end(function(err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("Not Authorized");
                done()
            })
        })
        it("should success to delete cart", function(done){
            chai
            .request(app)
            .delete(`/carts/${cartId}`)
            .set({ authorization:tokenCostumer })
            .end(function(err,res){
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                expect(res.body.message).to.equal("Successfully delete the cart")
                done()
            })
        })
    })
});

