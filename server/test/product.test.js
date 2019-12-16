const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const { readFileSync } = require("fs");
const User = require('../models/user');
// const Product = require('../models/product');

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

let tokenAdmin, tokenCostumer, productId;
let file = readFileSync("./test/test.png");

describe("Product Route Testing", function () {
    describe("Login Testing", function() {
        it("should successfully login as admin", function(done){
            let user = {
                "email": "admin@gmail.com",
                "password": "admin123"
            }
            chai
            .request(app)
            .post("/users/login")
            .send(user)
            .end(function(err, res){
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                tokenAdmin = res.body.token
                done();
            })
        });
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
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                tokenCostumer = res.body.token
                done();
            })
        })
    })
    describe("GET /products", function () {
        it("should successfully get products data", function (done) {
            chai
            .request(app)
            .get("/products")
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array")
                res.body.forEach(element => {
                    expect(element).to.have.keys(["_id","name","image","price","stock"])
                });
                done()
            });
        });
    });
    describe("POST /products", function () {
        it("should successfully create product", function (done) {
            chai
            .request(app)
            .post("/products")
            .set({ authorization: tokenAdmin })
            .attach("image", file, "file.png")
            .field("name", "Ibanez AEX112")
            .field("price", "1000000")
            .field("stock", "10")
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                productId = res.body._id; 
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.keys(["_id","name","image","price","stock"])     
                done();
            });
        });
        it("should fail to create product (Token is invalid)", function(done) {
            chai
            .request(app)
            .post("/products")
            .set({authorization: "hehehehe"})
            .attach("image", file, "file.png")
            .field("name", "Ibanez AEX112")
            .field("price", "1000000")
            .field("stock", "10")
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(403);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("Token is invalid"); 
                done();
            });
        })
        it("should fail to create product (using customer's token)", function(done){
            chai
            .request(app)
            .post("/products")
            .set({ authorization: tokenCostumer })
            .attach("image", file, "file.png")
            .field("name", "Ibanez AEX112")
            .field("price", "1000000")
            .field("stock", "10")
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("Not Authorized as Admin");
                done();
            });
        })
        it("should fail to create product (Negative Prices)", function(done){
            chai
            .request(app)
            .post("/products")
            .set({ authorization: tokenAdmin })
            .attach("image", file, "file.png")
            .field("name", "Ibanez AEX112")
            .field("price", "-1")
            .field("stock", "10")
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("Product validation failed");    
                done();
            });
        })
        it("should fail to create product (Stock is negative)", function(done){
            chai
            .request(app)
            .post("/products")
            .set({authorization: tokenAdmin})
            .attach("image", file, "file.png")
            .field("name", "Ibanez AEX112")
            .field("price", "10")
            .field("stock", "-1")
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("Product validation failed");   
                done();
            });
        })
        it("should fail to create product (Image is not included)", function(done){
            chai
            .request(app)
            .post("/products")
            .set({authorization: tokenAdmin})
            .field("name", "Ibanez AEX112")
            .field("price", "10")
            .field("stock", "10")
            .end(function (err, res) {
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("Product validation failed");   
                done();
            });
        })
    });
    describe("DELETE /products", function(){
        it("should successfully delete product", function(done){
            chai
            .request(app)
            .delete(`/products/${productId}`)
            .set({authorization:tokenAdmin})
            .end(function(err,res){
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                expect(res.body.message).to.equal("Successfully delete the product")
                done()
            })
        })
        it("should fail to delete product (Invalid ID)", function(done){
            chai
            .request(app)
            .delete(`/products/7s8dgf28invalididhehe7dfg37f3j`)
            .set({authorization:tokenAdmin})
            .end(function(err,res){
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("Product ID not found");
                done()
            })
        })
        it("should fail to delete product (token is not available)", function(done){
            chai
            .request(app)
            .delete(`/products/${productId}`)
            .end(function(err,res){
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("Token is undefined");
                done()
            })
        })
        it("should failed to delete product (using customer's token)", function(done){
            chai
            .request(app)
            .delete(`/products/${productId}`)
            .set({ authorization:tokenCostumer })
            .end(function(err,res){
                console.log("res.body => ", JSON.stringify(res.body, null, 3))
                expect(err).to.be.null;
                expect(res).to.have.status(401);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.all.keys('message');
                expect(res.body.message).to.include("Not Authorized as Admin"); 
                done()
            })
        })
    })
});

