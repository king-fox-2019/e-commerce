const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const User = require("../models/user");
const Item = require("../models/item");

chai.use(chaiHttp);
const expect = chai.expect;

let adminRole = {
  name: "edwin",
  email: "edwin@gmail.com",
  password: "edwinsatya"
};

let customerRole = {
  name: "kirito",
  email: "kirito@gmail.com",
  password: "linkstart"
};

let adminLogin = {
  email: adminRole.email,
  password: adminRole.password
};

let customerLogin = {
  email: customerRole.email,
  password: customerRole.password
};

let initialItem = {
  name: "Green Sweet Traning",
  image: "tes.jpg",
  price: 3900,
  stock: 20,
  category: "newitem"
};

before(function(done) {
  User.create(adminRole)
    .then(_ => {
      return User.create(customerRole);
    })
    .then(_ => {
      return User.findOneAndUpdate(
        {
          name: "edwin"
        },
        {
          role: "admin"
        }
      );
    })
    .then(_ => {
      console.log(
        `testing : => initial create user admin and customer success`
      );
      done();
    })
    .catch(console.log);
});

after(function(done) {
  if (process.env.NODE_ENV === "testing") {
    User.deleteMany({})
      .then(_ => {
        console.log(
          "testing : => delete data from database after testing success"
        );
        done();
      })
      .catch(console.log);
  }
});

describe(`Item Routes`, function() {
  let token = "";
  before(function(done) {
    chai
      .request(app)
      .post("/users/login")
      .send(adminLogin)
      .end(function(err, res) {
        token = res.body.token;
        done();
      });
  });

  describe("POST /items", function() {
    describe("success process", function() {
      it("should return object item and status code 201", function(done) {
        chai
          .request(app)
          .post("/items/")
          .set("token", token)
          .send(initialItem)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("response", "message");
            done();
          });
      });
    });

    describe("error process", function() {
      it("should return error with status code 400 caused by empty field item name", function(done) {
        const withoutName = { ...initialItem };
        delete withoutName.name;
        chai
          .request(app)
          .post("/items")
          .set("token", token)
          .send(withoutName)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Please input name item");
            done();
          });
      });

      it("should return error with status code 400 caused by empty field price item", function(done) {
        const withoutPrice = { ...initialItem };
        delete withoutPrice.price;
        chai
          .request(app)
          .post("/items")
          .set("token", token)
          .send(withoutPrice)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal(
              `Cast to Number failed for value "NaN" at path "price"`
            );
            done();
          });
      });

      it("should return error with status code 400 caused by negative value of price", function(done) {
        const negativePrice = { ...initialItem };
        negativePrice.price = -10;
        chai
          .request(app)
          .post("/items")
          .set("token", token)
          .send(negativePrice)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Input must be Higher then 0");
            done();
          });
      });

      it("should return error with status code 400 caused by empty value of stock", function(done) {
        const emptyStock = { ...initialItem };
        delete emptyStock.stock;
        chai
          .request(app)
          .post("/items")
          .set("token", token)
          .send(emptyStock)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal(
              `Cast to Number failed for value "NaN" at path "stock"`
            );
            done();
          });
      });

      it("should return error with status code 400 caused by negative value of stock", function(done) {
        const negativeStock = { ...initialItem };
        negativeStock.stock = -10;
        chai
          .request(app)
          .post("/items")
          .set("token", token)
          .send(negativeStock)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Input must be Higher then 0");
            done();
          });
      });

      it("should return error with status code 400 caused by input empty category", function(done) {
        const emptyCategory = { ...initialItem };
        emptyCategory.category = null;
        chai
          .request(app)
          .post("/items")
          .set("token", token)
          .send(emptyCategory)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Please input category item");
            done();
          });
      });

      it("should return error with status code 400 caused by input empty image", function(done) {
        const emptyImage = { ...initialItem };
        delete emptyImage.image;
        chai
          .request(app)
          .post("/items")
          .set("token", token)
          .send(emptyImage)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Please input image item");
            done();
          });
      });

      it("should return error authentication with status code 401", function(done) {
        chai
          .request(app)
          .post("/items")
          .send(initialItem)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("You should log in first!");
            done();
          });
      });

      it("should return error authentication with status code 401 caused the token is not valid", function(done) {
        chai
          .request(app)
          .post("/items")
          .set("token", "randomToken")
          .send(initialItem)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("You should log in first!");
            done();
          });
      });
    });
  });

  describe("GET /items", function() {
    describe("success process", function() {
      it("should return array of object of items list and send status code 200", function(done) {
        chai
          .request(app)
          .get("/items")
          .set("token", token)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
            done();
          });
      });
    });
  });

  let itemId = "";

  before(function(done) {
    Item.create(initialItem)
      .then(item => {
        itemId = item._id;
        done();
      })
      .catch(console.log);
  });

  describe("GET /items/detail/:id", function() {
    describe("success process", function() {
      it("should return object of item and send status code 200", function(done) {
        chai
          .request(app)
          .get(`/items/detail/${itemId}`)
          .set("token", token)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("name", "image", "price", "stock", "category");
            done();
          });
      });
    });

    describe("error process", function(done) {
      it("should return error with status code 401 caused failed pass authenticate process", function(done) {
        chai
          .request(app)
          .get(`/items/detail/${itemId}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("You should log in first!");
            done();
          });
      });

      it("should return error authentication with status code 401 caused the token is not valid", function(done) {
        chai
          .request(app)
          .get(`/items/detail/${itemId}`)
          .set("token", "randomToken")
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("You should log in first!");
            done();
          });
      });
    });
  });

  describe("PUT /items/:id", function() {
    let custToken = "";

    before(function(done) {
      chai
        .request(app)
        .post("/users/login")
        .send(customerLogin)
        .end(function(err, res) {
          custToken = res.body.token;
          done();
        });
    });

    describe("success process", function() {
      it("should return new object product and status code 200", function(done) {
        const data = { ...initialItem };
        chai
          .request(app)
          .put(`/items/${itemId}`)
          .set("token", token)
          .send(data)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            done();
          });
      });
    });

    describe("error process", function() {
      it("should return error with status code 401 caused failed to pass authorization", function(done) {
        let data = { ...customerLogin };
        chai
          .request(app)
          .put(`/items/${itemId}`)
          .set("access_token", custToken)
          .send(data)
          .end(function(err, res) {
            console.log(res.body);
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("You should log in first!");
            done();
          });
      });

      it("should return error with status code 401 caused failed pass authenticate, dont set any headers in client", function(done) {
        let data = { ...customerLogin };
        chai
          .request(app)
          .put(`/items/${itemId}`)
          .send(data)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("You should log in first!");
            done();
          });
      });

      it("should return error with status code 401 caused failed oass authenticate, token not valid from client", function(done) {
        let data = { ...customerLogin };
        chai
          .request(app)
          .put(`/items/${itemId}`)
          .set("token", "randomToken")
          .send(data)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("You should log in first!");
            done();
          });
      });

      it("should return error with status code 404 caused cannot find product with given id", function(done) {
        let data = { name: "has been changed" };
        chai
          .request(app)
          .put(`/items/123456789`)
          .set("token", token)
          .send(data)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Object not found");
            done();
          });
      });
    });
  });

  describe("DELETE /product/:id", function() {
    let custToken = "";

    before(function(done) {
      chai
        .request(app)
        .post("/users/login")
        .send(customerLogin)
        .end(function(err, res) {
          custToken = res.body.token;
          done();
        });
    });

    describe("success process", function() {
      it("should return status 200 with message delete item success!", function(done) {
        chai
          .request(app)
          .delete(`/items/${itemId}`)
          .set("token", token)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body.message).to.equal("Success Remove Item");
            done();
          });
      });
    });

    describe("error process", function() {
      it("should return error with status code 401 caused failed pass the authorization", function(done) {
        chai
          .request(app)
          .delete(`/items/${itemId}`)
          .set("token", custToken)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal(
              "Just Admin Can Handle This Menu"
            );
            done();
          });
      });

      it("should return error with status code 401 caused failed pass the authentication", function(done) {
        chai
          .request(app)
          .delete(`/items/${itemId}`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("You should log in first!");
            done();
          });
      });

      it("should return error with status code 401 caused given token not valid", function(done) {
        chai
          .request(app)
          .delete(`/items/${itemId}`)
          .set("token", "randomToken")
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("You should log in first!");
            done();
          });
      });

      it("should return error with status code 404 caused cannot find any items with given params", function(done) {
        chai
          .request(app)
          .delete(`/items/123456789`)
          .set("token", token)
          .end(function(err, res) {
            console.log(res.body);
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Object not found");
            done();
          });
      });
    });
  });
});
