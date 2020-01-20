const chai = require("chai");
const chaiHttp = require("chai-http")
const chaiThings = require("chai-things")
const server = require("../app");
const { User, Product, Cart } = require("../models")
const { generateToken } = require("../helpers/jwt")
chai.use(chaiHttp);
chai.use(chaiThings)
const expect = chai.expect;

//---------------------------------------------------//
//                    Cart Testing                   //
// --------------------------------------------------//

after(function(done) {
  Cart.deleteMany({})
  .then(() => {
    done()
  })
  .catch(err => {
    console.log(err)
  })
})


let productId = "";
let token ="";
let cartId = "";
let amount = 0;
describe("Cart", function() {
  before(function(done) {
    Product.create({
      name: "Tes product",
      description: "Really good product",
      image: "image-link",
      price: 90000,
      stock: 99
    })
      .then(product => {
        productId = product._id;
        return User.create({
          username: "cart",
          email: "cart@mail.com",
          password: "pass123"
        })
      })
      .then(user => {
        let { _id, email  } = user;
        token = generateToken({ _id, email });
        done()
      })
      .catch(done)
  })

  describe("POST /cart", function() {
    describe("Zero amount", function() {
      it("should return status 400 and amount must contain at minimum one product message", function(done) {
        let cart3 = {
          productId,
          amount: 0
        }
        chai.request(server)
          .post("/cart")
          .set("access_token", token)
          .send(cart3)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.message).to.have.include("amount")
            done();
          })
          .catch(done)
      })
    })

    describe("Empty productId", function() {
      it("should return status 400 and productId must be filled out message", function(done) {
        let cart2 = {
          amount: 1,
        }
        chai.request(server)
          .post("/cart")
          .set("access_token", token)
          .send(cart2)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.message).to.have.include("productId")
            done();
          })
          .catch(done)
      })
    })

    describe("Successful", function() {
      it("should return status 201 and message", function(done) {
        let cart = {
          productId: productId,
          amount: 1,
        }
        chai.request(server)
          .post("/cart")
          .set("access_token", token)
          .send(cart)
          .then(res => {
            cartId = res.body._id;
            amount = res.body.amount;
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.keys("__v", "_id", "userId", "productId", "amount")
            done();
          })
          .catch(done)
      })
    })



  })

  describe("DELETE /cart", function() {
    describe("Successful", function() {
      it("should return status 200 and successfully deleted message", function(done) {
        chai.request(server)
          .delete("/cart/" + cartId)
          .set("access_token", token)
          .send({ amount })
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body.message).to.include("deleted")
            done();
          })
          .catch(done)
      })
    })
  })
})