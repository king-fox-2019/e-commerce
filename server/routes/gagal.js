"use strict";
const { User, Product, Cart } = require("../models");

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);

describe("API Testing", () => {
  describe("#Register", function() {
    it("it should success have status 201", done => {
      chai
        .request(app)
        .post("/user")
        .send({
          fullname: "muhammad ilham",
          email: "iilham@mail.com",
          password: "Kakobos15"
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          /* res.body isinya apa valuenya apa fieldnya, kalo gagalnnya mana */
          done();
        });
    });
  });
  describe("#login", function() {
    it("it should send token to client", done => {
      chai
        .request(app)
        .post("/user/login")
        .send({
          email: "iilham@mail.com",
          password: "Kakobos15"
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.token).to.be.a("String");
          done();
        });
    });
    it("it should send error when user credentials is not match", done => {
      chai
        .request(app)
        .post("/user/login")
        .send({
          email: "iilham@mail.com",
          password: "sdsds"
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
    it("it should send error when user are not found", done => {
      chai
        .request(app)
        .post("/user/login")
        .send({
          email: "il@mail.com",
          password: "asdas"
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe("#Product", function() {
    it("It should send array of product to client with status 200 ", done => {
      chai
        .request(app)
        .get("/product")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("Array");
          /* Array nya di cek lengthnya berapa, harus 0 dong. atau di before lo seed produk misal 2 biji res.body[0].to.have.property('name').equal('nama yang di seeding') */
          done();
        });
    });
    it("It should send status 201 when product successfully created", done => {
      chai
        .request(app)
        .post("/product")
        .send({
          name: "Susu Bola",
          price: 50000,
          stock: 1000,
          image: 'https://previews.123rf.com/images/cla78/cla781509/cla78150900040/45814472-blue-and-white-milk-carton-box-isolated-on-a-white-background.jpg'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("Object");
          done();
        });
    });
    it("it expected to sent status 200 and message 'Item added to cart'", done => {
      chai
        .request(app)
        .post("/cart")
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZWZjYzExYTY1ZTA5NjUwNjI3ZGE0YiIsImZ1bGxuYW1lIjoiTXVoYW1tYWQgSWxoYW0iLCJpYXQiOjE1NzU5OTY0Nzh9.7tNDmGGs8pPcyOg8-_7nv2CIRzCA3vng2ZLY8ffqWgI')
        .send({
          product: {
            productId: "susu bendera",
            qty: 2,
          }
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Item added to cart");
          done();
        });
    })
    // it("It should send status 200 when product successfully deleted", done => {
    //   chai
    //     .request(app)
    //     .delete("/product/5dee1ce52e36435bd9b95cd5")
    //     .end((err, res) => {
    //       expect(res).to.have.status(200);
    //       done();
    //     });
    // });
  });
});
