const chai = require("chai");
const chaiHttp = require("chai-http")
const chaiThings = require("chai-things")
const server = require("../app");
const { User, Product } = require("../models")
const { generateToken } = require("../helpers/jwt")
chai.use(chaiHttp);
chai.use(chaiThings)
const expect = chai.expect;

//---------------------------------------------------//
//                   Products Testing                //
// --------------------------------------------------//

after(function(done) {
  Product.deleteMany({})
  .then(() => {
    done()
  })
  .catch(err => {
    console.log(err)
  })
})

let token = "";
let productId = "";
describe("Products", function() {
  before(function(done) {
    User.create({
      username: "usernamee",
      email: "mmy@mail.com",
      password: "pass123"
    })
      .then(user => {
        let { _id, email  } = user;
        token = generateToken({ _id, email })
        done()
      })
      .catch(done)
  })
  describe("POST /products", function() {

    describe("Successful", function() {
      it("should return status 201 and an object", function(done) {
        let product = {
          name: "Tes product",
          description: "Really good product",
          image: "image-link",
          price: 90000,
          stock: 99,
        }
        chai.request(server)
          .post("/products")
          .set("access_token", token)
          .send(product)
          .then(res => {
            productId = res.body._id;
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.keys(["__v", "_id", "name", "image", "description", "price", "stock"])
            done();
          })
          .catch(done)
        })
    })

    describe("Empty description", function() {
      it("should return 'product name must be filled out'", function(done) {
        let product = {
          name: "Filled name",
          description: "",
          image: "image-link",
          price: 90000,
          stock: 99,
        }
        
        chai.request(server)
          .post("/products")
          .set("access_token", token)
          .send(product)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.message).to.include("description")
            done();
          })
          .catch(done)
      })
    })

    describe("Empty image", function() {
      it("should return 'product image must be filled out'", function(done) {
        let product = {
          name: "Filled name",
          description: "Concise description",
          image: "",
          price: 90000,
          stock: 99,
        }
        
        chai.request(server)
          .post("/products")
          .set("access_token", token)
          .send(product)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.message).to.include("image")
            done();
          })
          .catch(done)
      })
    })

    describe("Empty price", function() {
      it("should return 'product price must be filled out'", function(done) {
        let product = {
          name: "Filled name",
          description: "Concise description",
          image: "nice-img.com",
          price: null,
          stock: 99,
        }
        
        chai.request(server)
          .post("/products")
          .set("access_token", token)
          .send(product)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.message).to.include("price")
            done();
          })
          .catch(done)
      })
    })

    describe("Empty stock", function() {
      it("should return 'product stock must be filled out'", function(done) {
        let product = {
          name: "Filled name",
          description: "Concise description",
          image: "nice-img.com",
          price: 87000,
          stock: null,
        }
        
        chai.request(server)
          .post("/products")
          .set("access_token", token)
          .send(product)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.message).to.include("stock")
            done();
          })
          .catch(done)
      })
    })
  })

  describe("GET /products", function() {
    describe("Successful", function() {
      it("should return status 200 and array of product object", function(done) {
        chai.request(server)
        .get("/products")
        .then(function(res) {
          expect(res.body).to.be.an("array");
          expect(res.body).to.all.have.keys(["__v", "_id", "name", "image", "price", "description", "stock"])
          done();
        })
        .catch(done)
      })
    })
  });

  
  describe("PATCH /products/:productId", function() {
    describe("Successful", function() {
      it("should return status 200 and an object", function(done) {
        let product = {
          name: "Tes edit product",
          description: "Bisa coyy",
          price: 9999900,
          stock: 99,
          image: "image-link-12"
        }
        chai.request(server)
          .patch("/products/" + productId)
          .set("access_token", token)
          .send(product)
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.keys(["__v", "_id", "name", "image", "description", "price", "stock"])
            done();
          })
          .catch(done)
        })
      })
  });

  describe("DELETE /products/:productId", function() {
    describe("Successful", function() {
      it("should return status 200 and deleted product id", (done) => {
        chai.request(server)
          .delete("/products/" + productId)
          .set("access_token", token)
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            done();
          })
          .catch(done)
      })
    })
  })
});