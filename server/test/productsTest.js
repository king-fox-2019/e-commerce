const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");

chai.use(chaiHttp);

let access_token = "";
let productId = "";

describe("products", function() {
  before("User log in", function(done) {
    chai
      .request(app)
      .post("/users/login")
      .send({
        username: "user1234",
        email: "user@mail.com",
        password: "12345678"
      })
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          access_token = res.body.access_token;
          done();
        }
      });
  });

  describe("POST/", () => {
    it("should return an object of product if name, price, and quantity are valid and user logged in", done => {
      chai
        .request(app)
        .post("/products")
        .set("access_token", access_token)
        .send({
          name: "shoes",
          price: 399000,
          quantity: 10
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            productId = res.body._id;
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(201);
            expect(res.body).to.include.all.keys(
              "name",
              "price",
              "quantity",
              "UserId"
            );
            done();
          }
        });
    });
    it("should return authentication error when user is not logged in or access token invalid", done => {
      chai
        .request(app)
        .post("/products")
        .send({
          name: "shoes",
          price: 399000,
          quantity: 10
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(401);
            expect(res.body.message).to.equals("You must log in first");
            done();
          }
        });
    });
    it("should return validation error when name is not provided", done => {
      chai
        .request(app)
        .post("/products")
        .set("access_token", access_token)
        .send({
          price: 399000,
          quantity: 10
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals("Name required");
            done();
          }
        });
    });
    it("should return validation error when price is not provided", done => {
      chai
        .request(app)
        .post("/products")
        .set("access_token", access_token)
        .send({
          name: "shoes",
          quantity: 10
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals("Price required");
            done();
          }
        });
    });
    it("should return validation error when quantity is not provided", done => {
      chai
        .request(app)
        .post("/products")
        .set("access_token", access_token)
        .send({
          name: "shoes",
          price: 399000
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals("Quantity required");
            done();
          }
        });
    });
    it("should return validation error when price is not valid", done => {
      chai
        .request(app)
        .post("/products")
        .set("access_token", access_token)
        .send({
          name: "shoes",
          price: 0,
          quantity: 10
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals(
              "Product price can not be lower than 1"
            );
            done();
          }
        });
    });
    it("should return validation error when quantity is not valid", done => {
      chai
        .request(app)
        .post("/products")
        .set("access_token", access_token)
        .send({
          name: "shoes",
          price: 399000,
          quantity: 0
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals(
              "Product quantity can not be lower than 1"
            );
            done();
          }
        });
    });
  });

  describe("GET/", () => {
    it("should return an array of product objects", done => {
      chai
        .request(app)
        .get("/products")
        .set("access_token", access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("array");
            expect(res).to.have.status(200);
            done();
          }
        });
    });
  });

  describe("GET/:id", () => {
    it("should return an object of product if the ID is valid", done => {
      chai
        .request(app)
        .get(`/products/${productId}`)
        .set("access_token", access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(200);
            done();
          }
        });
    });
    it("should return error when ID not found", done => {
      chai
        .request(app)
        .get(`/products/abc`)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(404);
            expect(res.body.message).to.equals("Product not found");
            done();
          }
        });
    });
  });

  describe("PATCH/:id", () => {
    it("should return an object of updated product if the ID is valid and user logged in", done => {
      chai
        .request(app)
        .patch(`/products/${productId}`)
        .set("access_token", access_token)
        .send({
          name: "shoes",
          price: 499000,
          quantity: 5
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(200);
            expect(res.body).to.include.all.keys("name", "price", "quantity");
            done();
          }
        });
    });
    it("should return error when ID not found", done => {
      chai
        .request(app)
        .patch(`/products/${productId}`)
        .set("access_token", access_token)
        .send({
          name: "shoes",
          price: 499000,
          quantity: 5
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(404);
            expect(res.body.message).to.equals("Product not found");
            done();
          }
        });
    });
    it("should return error if user not logged in", done => {
      chai
        .request(app)
        .patch(`/products/${productId}`)
        .send({
          name: "shoes",
          price: 499000,
          quantity: 5
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(401);
            expect(res.body.message).to.equals("You must log in first");
            done();
          }
        });
    });
    it("should return error if logged in user is not the admin", done => {
      chai
        .request(app)
        .patch(`/products/${productId}`)
        .set("access_token", "1241248ot")
        .send({
          name: "shoes",
          price: 499000,
          quantity: 5
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(401);
            expect(res.body.message).to.equals("Unauthorized process!");
            done();
          }
        });
    });
  });

  describe("DELETE/:id", () => {
    it("should return a success message if the ID is valid and user logged in", done => {
      chai
        .request(app)
        .delete("/products/:id")
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            res.should.have.status(200);
            res.body.should.be.an("object");
            done();
          }
        });
    });
    it("should return error when ID not found", done => {
      chai
        .request(app)
        .delete(`/products/${productId}`)
        .set("access_token", access_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(404);
            expect(res.body.message).to.equals("Product not found");
            done();
          }
        });
    });
    it("should return error if user not logged in", done => {
      chai
        .request(app)
        .delete(`/products/${productId}`)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(401);
            expect(res.body.message).to.equals("You must log in first");
            done();
          }
        });
    });
    it("should return error if logged in user is not the admin", done => {
      chai
        .request(app)
        .delete(`/products/${productId}`)
        .set("access_token", "1241248ot")
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(401);
            expect(res.body.message).to.equals("Unauthorized process!");
            done();
          }
        });
    });
  });
});
